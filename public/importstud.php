<?php

$regnum_err = $name_err = "";
if(is_uploaded_file($_FILES['file']['tmp_name'])){
    $type_of_file = explode(".", $_FILES["file"]["name"]);
    if (strtolower(end($type_of_file)) == "csv") {
        $count = 1;
        $filename = $_FILES["file"]["tmp_name"];
        if ($_FILES["file"]["size"] > 0) {

             // Opening file in read mode.
            $file = fopen($filename, "r");

             // To skip the first line of the table (can be added the required times to skip required lines)
            while (($fields = fgetcsv($file, 1000, ",")) !== FALSE) {
                $count++;
                if ($count == 9){
                    break;
                }
                else{

                }
            }
            
            // Validate CSV first
            while (($emapData = fgetcsv($file, 1000, ",")) !== FALSE) {
                // Validate regnum
                if (empty(trim($emapData[0]))) {
                    $regnum_err = "Please Enter the Reg. No";
                } else if(strlen(trim($emapData[0])) != 9){
                    $regnum_err = "Student Id is not of 9 digits.";
                } else {
                    $regnum = trim($emapData[0]);
                }
                
                // Validate name
                if (empty(trim($emapData[1]))) {
                    $name_err = "Please enter the Name.";
                } else {
                    $name = trim($emapData[1]);
                }

                if (empty($regnum_err) && empty($name_err)){
                    $count++;
                }
                else {
                    break;
                }  
            }
            // file closed
            fclose($file);

            // validation is over here.
            // If all errors are empty then make json object
            $json_data = array();
            if (empty($regnum_err) && empty($name_err)) {
                $file = fopen($filename, "r");
                // To skip the first line of the table (can be added the required times to skip required lines)
                $count = 1;
                while (($fields = fgetcsv($file, 1000, ",")) !== FALSE) {
                    $count++;
                    if ($count == 9){
                        break;
                    }
                    else{

                    }
                }
                while (($emapData = fgetcsv($file, 1000, ",")) !== FALSE) {
                    
                    $bus = array(
                        'regno' => trim($emapData[0]),
                        'name' => trim($emapData[1])
                    );
                    array_push($json_data, $bus);

                }
                fclose($file);
                $json = array(
                    'data' => $json_data,
                    'error' => NULL,
                    'message' => 'CSV Imported Successfully',
                    'elseerror' => NULL
                );
                $jsonstring = json_encode($json);
                echo $jsonstring;
            }
            else {
                $bus = array(
                    'regno_err' => $regnum_err,
                    'name_err' => $name_err,
                    'line' => $count + 1
                );
                $json = array(
                    'data' => NULL,
                    'error' => $bus,
                    'message' => 'Error Found in the File',
                    'elseerror' => NULL
                );
                $jsonstring = json_encode($json);
                echo $jsonstring;
            }
        }
        else {
            $json = array(
                'data' => NULL,
                'error' => NULL,
                'message' => NULL,
                'elseerror' => 'Cannot Read File. File Size is 0'
            );
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
    else {
        $json = array(
            'data' => NULL,
            'error' => NULL,
            'message' => NULL,
            'elseerror' => 'Invalid File type : Please Upload a CSV File only'
        );
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
else {
    $json = array(
        'data' => NULL,
        'error' => NULL,
        'message' => NULL,
        'elseerror' => 'File Empty!'
    );
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
?>