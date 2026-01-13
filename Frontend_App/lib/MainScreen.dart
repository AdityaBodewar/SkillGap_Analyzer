import 'package:flutter/material.dart';
import 'package:pracccc/HomePage.dart';
import 'package:pracccc/ProfilePage.dart';

class MainScreen extends StatefulWidget{

  State<MainScreen> createState() => _Main_screen();
}

class _Main_screen extends State<MainScreen>{
int currentindex=0;
  List<Widget> pages = [
    HomePage(),
    Profilepage(),
  ];

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: pages[currentindex],

      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentindex,
        selectedItemColor: Colors.lightGreen,
        onTap: (index){
          setState(() {
            currentindex=index;
          });
        },
        
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home),label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.person),label: "Profile"),

        ],

          ),
    );

  }
}