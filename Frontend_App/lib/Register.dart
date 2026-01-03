import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:pracccc/apiservice.dart';

class Register extends StatefulWidget{

  State<Register> createState() => _Register();
}

class _Register extends State<Register>{

  TextEditingController email = TextEditingController();
  TextEditingController username = TextEditingController();
  TextEditingController age = TextEditingController();
  TextEditingController password = TextEditingController();


  Future<void> register() async {
    if(email.text.isEmpty || username.text.isEmpty || password.text.isEmpty || age.text.isEmpty){

      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("enter all field"),
            backgroundColor: Colors.red,)
      );
      return;
    }
 final res = await Apiservice.register(
    username: username.text,
    email: email.text,
    age: age.text,
    password: password.text
);

    if(res['message']!=null){
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(res["message"]),
          backgroundColor: Colors.green,
        ),
      );
    }else{
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(res["error"]),
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
           width: 360,
           padding: EdgeInsets.all(16),
           decoration: BoxDecoration(
             color: Colors.white,
             border: Border.all(color: Colors.grey),
             borderRadius: BorderRadius.circular(16),
           ),

           child: Column(
             children: [
               Text(
                   "Register",
                 style: TextStyle(color: Colors.black,
                     fontWeight: FontWeight.bold,
                   fontSize: 22,
                 ),

               ),
               const SizedBox(height: 20,),

               TextField(
                 controller: email,
                 decoration: InputDecoration(
                   label: Text("Enter email"),
                   border: OutlineInputBorder(),
                 ),
               ),

               const SizedBox(height: 20,),

               TextField(
                 controller: username,
                 decoration: InputDecoration(
                   label: Text("Enter Username"),
                   border: OutlineInputBorder(),
                 ),
               ),

               const SizedBox(height: 20,),
               TextField(
                 controller: age,
                 keyboardType: TextInputType.number,
                 decoration: InputDecoration(
                   label: Text("Enter Age"),
                   border: OutlineInputBorder(),
                 ),
               ),

               const SizedBox(height: 20,),
               TextField(
                 controller: password,
                 obscureText: true,
                 decoration: InputDecoration(
                   label: Text("Enter Password"),
                   border: OutlineInputBorder(),
                 ),
               ),

               const SizedBox(height: 20,),
               SizedBox( 
                   width: double.infinity,
                   height: 45,
                   child:ElevatedButton(onPressed:register,
                   style: ElevatedButton.styleFrom(
                     backgroundColor: Colors.blue,

                   ),

                   child: Text("Register",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold),))
               )
              

             ],
           ),

         ),
        ),
      ),
    );
  }
}