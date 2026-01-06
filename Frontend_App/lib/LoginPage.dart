import 'package:flutter/material.dart';
import 'package:pracccc/MainScreen.dart';
import 'package:pracccc/Register.dart';
import 'package:pracccc/apiservice.dart';
import 'package:shared_preferences/shared_preferences.dart';


class LoginPage extends StatefulWidget {
  @override
  State<LoginPage> createState() => _Loginpage();
}

class _Loginpage extends State<LoginPage> {

  @override
  void initState() {
    super.initState();
    checkToken();

  }

  Future<void>checkToken() async{
   final prefs = await SharedPreferences.getInstance();
   final token = prefs.getString("token");
   
   if(token!=null){
     Navigator.pushReplacement(
       context,
       MaterialPageRoute(builder: (_)=> MainScreen())
     );
   }
  }

  TextEditingController email = TextEditingController();
  TextEditingController password = TextEditingController();

  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString("token", token);
  }


  Future<void> login() async{

    final emailtxt = email.text.trim();
    final passtxt = password.text.trim();

    if(emailtxt.isEmpty || passtxt.isEmpty){
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Enter all field"),backgroundColor: Colors.red,)
      );
      return;
    }

    final res = await Apiservice.login(
        email: emailtxt,
        password: passtxt,
    );

    if (res["Token"] != null){

      await saveToken(res["Token"]);

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(res["message"]),
          backgroundColor: Colors.green,
        ),
      );

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => MainScreen()),
      );



    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(res["error"] ?? "Login Failed"),
          backgroundColor: Colors.red,
        ),
      );
    }

  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Container(
            width: 320,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey),
              borderRadius: BorderRadius.circular(12),
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 8,
                  offset: Offset(0, 4),
                )
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.max,
              children: [
                Text(
                  "Login",
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                const SizedBox(height: 20),

                TextField(
                  controller: email,
                  decoration: InputDecoration(
                    labelText: "Enter email",
                    border: OutlineInputBorder(),
                  ),
                ),

                const SizedBox(height: 20),

                TextField(
                  controller: password,
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: "Password",
                    border: OutlineInputBorder(),
                  ),
                ),

                const SizedBox(height: 30),

                SizedBox(
                  width: double.infinity,
                  height: 45,
                  child: ElevatedButton(
                    onPressed: () { login();},
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                    ),
                    child: const Text(
                      "Log in",
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),


                ),
                SizedBox(height: 20,),
                TextButton(onPressed: (){ Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (_) => Register()),
                );}, child: Text("Register",style: TextStyle(color: Colors.blue),))

              ],
            ),
          ),
        ),
      ),
    );
  }
}
