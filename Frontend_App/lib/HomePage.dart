import 'package:flutter/material.dart';
import 'package:pracccc/MainScreen.dart';
import 'package:pracccc/ProfilePage.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'LoginPage.dart';

class HomePage extends StatefulWidget {
  @override
  State<HomePage> createState() => _HomePage();
}

class _HomePage extends State<HomePage> {

  String? token;

  @override
  void initState(){
    super.initState();
    loadtoken();
  }

Future<void> loadtoken() async{
  final prefs = await SharedPreferences.getInstance();
  setState(() {
    token = prefs.getString("token");
  });
}

Future<void> logout(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove("token");

    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (_) => LoginPage()),
          (route) => false,
    );


  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Icon(Icons.menu_rounded),
        title: Text("Home"),

        actions: [
          IconButton(
            icon: Icon(Icons.person),
            onPressed: () {

              if(token!=null){
                Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_)=> Profilepage()),
                );
              }else{
                Navigator.pushReplacement(context, MaterialPageRoute(builder: (_)=> LoginPage()));
              }

            },
          ),
        ],
      ),

      body: Center(
        child: TextButton(onPressed: (){logout(context);}, child: Text("Logout")),
      ),
    );
  }
}
