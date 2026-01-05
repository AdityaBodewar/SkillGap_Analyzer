import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'LoginPage.dart';

class Profilepage extends StatefulWidget {
  @override
  State<Profilepage> createState() => _ProfilePage();
}

class _ProfilePage extends State<Profilepage> {

  Future<void> logout() async {
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
        title: Text("Profile"),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: logout,
          )
        ],
      ),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CircleAvatar(
              radius: 45,
              child: Icon(Icons.person, size: 45),
            ),

            const SizedBox(height: 15),

            Text(
              "User Name",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 5),

            Text(
              "user@email.com",
              style: TextStyle(color: Colors.grey),
            ),

            const SizedBox(height: 30),

            ElevatedButton(
              onPressed: logout,
              child: Text("Logout"),
            )
          ],
        ),
      ),
    );
  }
}
