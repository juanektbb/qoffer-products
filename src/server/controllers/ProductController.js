import fs from 'fs'
import format from 'pg-format'
import csvtojson from "csvtojson"
import pool from "../shared/database.js"

export const submitCSV = async (req, res) => {

    //There was no files or csv file in request
    if(!req.files || !req.files.csv_file)
        return res.json({ "error": "You need to submit a file to save your products" }).end()

    const { csv_file } = req.files

    console.log(csv_file)

    //File submitted needs to be CSV
    if(csv_file.mimetype != 'text/csv')
        return res.json({ "error": "Only CSV files are accepted, try with another file" }).end()

    if(csv_file.size > 20000)
        return res.json({ "error": "Your file seems to be very large, try to upload a ligher one. Up to 20MB is allowed" })
  
    //Possible mapping options to read the unknown csv file
    const map_headers = {
        "name": "p_name",
        "product name": "p_name",
        "name product": "p_name",
        "p_name": "p_name",

        "code": "p_code",
        "product code": "p_code",
        "code product": "p_code",
        "p_code": "p_code",

        "sku": "p_sku",
        "sku product": "p_sku",
        "product sku": "p_sku",
        "stock keep unit": "p_sku",
        "stock keeping unit": "p_sku",
        "stock-keep-unit": "p_sku",
        "stock-keeping-unit": "p_sku",
        "p_sku": "p_sku",

        "description": "p_description",
        "product description": "p_description",
        "description product": "p_description",
        "p_description": "p_description",
    }

    const headers = {
        "p_name": null,
        "p_code": null,
        "p_sku": null,
        "p_description": null,
        // "extra_field_test": null,
    }

    //CONVERT DATA FROM FILE TO JSON WITHOUT SAVING IN DISK
    const csvData = csv_file.data.toString('utf8')
    const structure_as_json = await csvtojson().fromString(csvData).then(json => json)

    //File comes as empty
    if(structure_as_json.length == 0)
        return res.json({ "error": "It seems like your file does not have any products" }).end()

    let is_first_row = true
    let finalStructure = []

    //Go through every row
    for(let row of structure_as_json){

        //Necessary only in the first iteration 
        if(is_first_row){
            let header_keys = Object.keys(row)

            //For every key in the csv file
            for(let i in header_keys){
                let clean_str = header_keys[i].toLowerCase().trim() //Trim spaces and set to lowercase

                //Map our keys to the ones given in csv if exists
                if(clean_str in map_headers){
                    headers[map_headers[clean_str]] = header_keys[i]
                }
            }

            //Find any missing key that was not recorded and kill the stream as we don't accept this file
            for(let key in headers){
                if(!headers[key]){
                    //TODO: Improve searching keywords like "Company name product" for "name"

                    return res.json({ "error": "Your file does not have all the required headings which are (name, code, sku and description)" }).end()
                }
            }
            
            is_first_row = false
        }

        //One of the required fields is empty or no valid
        if(!row[headers['p_name']] || !row[headers['p_code']] || !row[headers['p_sku']] || !row[headers['p_description']]){

            //TODO: Let the user know which row is not valid

        //Populate final struture for database
        }else{
            finalStructure.push([
                row[headers['p_name']], 
                row[headers['p_code']], 
                row[headers['p_sku']], 
                row[headers['p_description']], 
            ])
        }
    }

    //Insert in database
    try{
        let insert_query = format("INSERT INTO products (p_name, p_code, p_sku, p_description) VALUES %L", finalStructure)
        const insert_result = await pool.query(insert_query)
        
    }catch(e){
        return res.json({ "error": "Unexpected error happened when storing the products" }).end()
    }

    //Success message
    return res.json({ "data": "Your products were saved succesfully, thank you!" }).end()

}