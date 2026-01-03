
import 'dart:convert';

import 'package:http/http.dart' as http;

class Apiservice{

  static const String apiuri= "http://172.21.245.81:5000";

  static Future<Map<String,dynamic>>register({
    required username,
    required email,
    required age,
    required password,

})async{
    try{
      final uri = Uri.parse("$apiuri/Register");
      final response = await http.post(
       uri,
       headers:{"Content-Type": "application/json"},
        body: jsonEncode({
          "Username":username,
          "Email":email,
          "Age":age,
          "Password":password

        })
      );
      // 👇 DEBUG (frontend only)
      print("STATUS = ${response.statusCode}");
      print("BODY = ${response.body}");


      return jsonDecode(response.body);

    }



    catch (e){
      return{
        "error": e.toString(),
      };
    }
  }



}

