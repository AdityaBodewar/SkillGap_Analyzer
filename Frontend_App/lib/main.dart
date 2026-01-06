import 'package:flutter/material.dart';
import 'package:pracccc/LoginPage.dart';
import 'package:pracccc/MainScreen.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  // WidgetsFlutterBinding.ensureInitialized();
  //
  // final prefs = await SharedPreferences.getInstance();
  // final String? token = prefs.getString("token");

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // final String? token;

  // const MyApp({Key? key, this.token}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginPage(),
    );
  }
}
