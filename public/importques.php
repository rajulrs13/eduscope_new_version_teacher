<?php

$question_err = $opt1_err = $opt2_err = $opt3_err = $opt4_err = $answer_err = $label_err = $type_err = "";

if(is_uploaded_file($_FILES['file']['tmp_name'])){

    $type_of_file = explode(".",$_FILES["file"]["name"]);
    if(strtolower(end($type_of_file)) == "csv"){
        $count = 1;
        $filename = $_FILES["file"]["tmp_name"];
        if ($_FILES["file"]["size"] > 0) {
            $file = fopen($filename,"r");
            // To skip the first line of the table (can be added the required times to skip required lines)
            // Validate CSV first
            while (($fields = fgetcsv($file, 1000, ",")) !== FALSE) {
                $count++;
                if ($count == 13){
                    break;
                }
                else{

                }
            }
            while (($emapData = fgetcsv($file, 1000, ",")) !== FALSE) {   
                $question = $opt1 = $opt2 = $opt3 = $opt4 = $answer = $label = $type = "";
                // Validate question
                if (empty(trim($emapData[0]))) {
                    $question_err = "Please enter the Question.";
                    if(strlen(trim($emapData[0])) == 1){
                        $question = trim($emapData[0]);
                        $question_err = "";
                    }
                }
                else {
                    $question = trim($emapData[0]);
                }
            
                // Validate Type
                if ((empty(trim($emapData[1]))) || (trim($emapData[1] )!="S" && trim($emapData[1])!="M" && trim($emapData[1])!="s" && trim($emapData[1])!="m")) {
                    $type_err = "Question type error.";
                }
                else {
                    $type = trim($emapData[1]);
                }
            
                // Validate opt1
                if (empty(trim($emapData[2]))) {
                    $opt1_err = "Please enter 1st option.";
                    if(strlen(trim($emapData[2])) == 1){
                        $opt1 = trim($emapData[2]);
                        $opt1_err = "";
                    }
                }
                else {
                    $opt1 = trim($emapData[2]);
                }
                
                // Validate opt2
                if (empty(trim($emapData[3]))) {
                    $opt2_err = "Please enter 2nd option.";
                    if(strlen(trim($emapData[3])) == 1){
                        $opt2 = trim($emapData[3]);
                        $opt2_err = "";
                    }
                } else {
                    $opt2 = trim($emapData[3]);
                }
                
                // validate opt3 and opt4
                if (empty(trim($emapData[4])) && !(empty(trim($emapData[5])))) {
                    $opt3_err = "Cannot leave Option C empty when Option D is filled";
                    if(strlen(trim($emapData[4])) == 1){
                        $opt3 = trim($emapData[4]);
                        $opt3_err = "";
                    }
                } else if (! (empty(trim($emapData[4])))) {
                    $opt3 = trim($emapData[4]);
                }
            
                // Validate Answer
                $emapData[1] = strtoupper($emapData[1]);
                if (empty(trim($emapData[6]))) {
                    $answer_err = "Please enter answer key.";
                } else if (! preg_match("/[A-Da-d]+$/", trim($emapData[6]))) {
                    $answer_err = "Please enter valid answer.";
                } else if (trim($emapData[1]) == "S" && strlen(trim($emapData[6])) != 1) {
                    $answer_err = "Please enter valid answer.";
                } else if (trim($emapData[1]) == "M" && (strlen(trim($emapData[6])) < 1 || strlen(trim($emapData[6])) > 4)) {
                    $answer_err = "Please enter valid answer.";
                } else {
                    $a=explode(",",trim($emapData[6]));
                    $b=implode("",$a);
                  
                    $answer = $b;
                }
            
                // Validate Topic
                if (empty(trim($emapData[7]))) {
                    $label_err = 'Please specify topic.';
                    if(strlen(trim($emapData[7])) == 1){
                        $label = trim($emapData[7]);
                        $label_err = "";
                    }
                } else {
                    $label = trim($emapData[7]);
                }

                // opt4
                if (! (empty(trim($emapData[5])))) {
                    
                    $opt4 = trim($emapData[5]);
                }
                else if(strlen(trim($emapData[5])) == 1){
                    $opt4 = trim($emapData[5]);
                    $opt4_err = "";
                }

                if (empty($question_err) && empty($opt1_err) && empty($opt2_err) && empty($opt3_err) && empty($opt4_err) && empty($answer_err) && empty($type_err) && empty($label_err)){
                    $count++;
                }
                else{
                    break;
                }
            }
            fclose($file);
            // File closed
            // Validation is over here.
            // If all errors are empty then make json object
            $json_data = array();
            if (empty($question_err) && empty($opt1_err) && empty($opt2_err) && empty($opt3_err) && empty($opt4_err) && empty($answer_err) && empty($type_err) && empty($label_err)) {
                $file = fopen($filename, "r");
                $count = 1;
                while (($fields = fgetcsv($file, 1000, ",")) !== FALSE) {
                    $count++;
                    if ($count == 13){
                        break;
                    }
                    else{
                
                    }
                } // To skip the first line of the table (can be added the required times to skip required lines)
                while (($emapData = fgetcsv($file, 1000, ",")) !== FALSE) {
            
                    $question = $opt1 = $opt2 = $opt3 = $opt4 = $answer = $label = $type = "";
                    // Validate question
                    if (empty(trim($emapData[0]))) {
                        $question_err = "Please enter the Question.";
                        if(strlen(trim($emapData[0])) == 1){
                            $question = trim($emapData[0]);
                            $question_err = "";
                        }
                    } else {
                        $question = trim($emapData[0]);
                    }
                
                    // Validate Type
                    if ((empty(trim($emapData[1]))) || (trim($emapData[1] )!="S" && trim($emapData[1])!="M" && trim($emapData[1])!="s" && trim($emapData[1])!="m")) {
                        $type_err = "Question type error.";
                    } else {
                        $type = strtoupper(trim($emapData[1]));
                    }
                    
                    // Validate opt1
                    if (empty(trim($emapData[2]))) {
                        $opt1_err = "Please enter 1st option.";
                        if(strlen(trim($emapData[2])) == 1){
                            $opt1 = trim($emapData[2]);
                            $opt1_err = "";
                        }
                    } else {
                        $opt1 = trim($emapData[2]);
                    }
                    
                    // Validate opt2
                    if (empty(trim($emapData[3]))) {
                        $opt2_err = "Please enter 2nd option.";
                        if(strlen(trim($emapData[3])) == 1){
                            $opt2 = trim($emapData[3]);
                            $opt2_err = "";
                        }
                    } else {
                        $opt2 = trim($emapData[3]);
                    }
                    
                    // validate opt3 and opt4
                    if (empty(trim($emapData[4])) && !(empty(trim($emapData[5])))) {
                        $opt3_err = "Cannot leave Option C empty when Option D is filled";
                        if(strlen(trim($emapData[4])) == 1){
                            $opt3 = trim($emapData[4]);
                            $opt3_err = "";
                        }
                    } else if (! (empty(trim($emapData[4])))) {
                        $opt3 = trim($emapData[4]);
                    }
                    
                    // Validate Answer
                    $emapData[1] = strtoupper($emapData[1]);
                    if (empty(trim($emapData[6]))) {
                        $answer_err = "Please enter answer key.";
                    } else if (! preg_match("/[A-Da-d]+$/", trim($emapData[6]))) {
                        $answer_err = "Please enter valid answer.";
                    } else if (trim($emapData[1]) == "S" && strlen(trim($emapData[6])) != 1) {
                        $answer_err = "Please enter valid answer.";
                    } else if (trim($emapData[1]) == "M" && (strlen(trim($emapData[6])) < 1 || strlen(trim($emapData[6])) > 4)) {
                        $answer_err = "Please enter valid answer.";
                    } else {
                        $a=explode(",",trim($emapData[6]));
                        $b=implode("",$a);
                      
                        $answer = strtoupper($b);
                    }
                    
                    // Validate Topic
                    if (empty(trim($emapData[7]))) {
                        $label_err = 'Please specify topic.';
                        if(strlen(trim($emapData[7])) == 1){
                            $label = trim($emapData[7]);
                            $label_err = "";
                        }
                    } else {
                        $label = trim($emapData[7]);
                    }

                    // opt4
                    if (! (empty(trim($emapData[5])))) {
                        
                        $opt4 = trim($emapData[5]);
                    }
                    else if(strlen(trim($emapData[5])) == 1){
                        $opt4 = trim($emapData[5]);
                        $opt4_err = "";
                    }
                    $temptype = 'Single Correct';
                    if($type == 'S'){
                        $temptype = 'Single Correct';
                    }
                    else{
                        $temptype = 'Multiple Correct';   
                    }
                    
                    $bus = array(
                        'qname' => $question,
                        'opt1' => $opt1,
                        'opt2' => $opt2,
                        'opt3' => $opt3,
                        'opt4' => $opt4,
                        'answer' => $answer,
                        'type' => $temptype,
                        'topic' => $label
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
                    'qname_err' => $question_err,
                    'opt1_err' => $opt1_err,
                    'opt2_err' => $opt2_err,
                    'opt3_err' => $opt3_err,
                    'opt4_err' => $opt4_err,
                    'answer_err' => $answer_err,
                    'type_err' => $type_err,
                    'line' => $count
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
                'message' => 'Error Found in the File',
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
            'message' => 'Error Found in the File',
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
        'message' => 'Error Found in the File',
        'elseerror' => 'File Empty!'
    );
    $jsonstring = json_encode($json);
    echo $jsonstring;
}

?>