import 'dart:convert';

import 'package:http/http.dart' as http;

class Apiservice {
  static const String apiuri = "http://10.122.214.81:5000";

  static Future<Map<String, dynamic>> register({
    required username,
    required email,
    required age,
    required password,
  }) async {
    try {
      final uri = Uri.parse("$apiuri/api/users/Register");
      final response = await http.post(
        uri,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "Username": username,
          "Email": email,
          "Age": age,
          "Password": password,
        }),
      );
      print("STATUS = ${response.statusCode}");
      print("BODY = ${response.body}");

      return jsonDecode(response.body);
    } catch (e) {
      return {"error": e.toString()};
    }
  }

 static Future<Map<String, dynamic>> login({
    required email,
    required password,
  }) async {
    try {
      final url = Uri.parse("$apiuri/api/users/Login");
      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"Email": email, "Password": password}),
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {"error": e.toString()};
    }
  }
}
