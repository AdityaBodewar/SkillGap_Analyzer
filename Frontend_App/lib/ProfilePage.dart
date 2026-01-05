import 'package:flutter/material.dart';
import 'package:pracccc/apiservice.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'LoginPage.dart';

class Profilepage extends StatefulWidget {
  @override
  State<Profilepage> createState() => _ProfilePage();
}

class _ProfilePage extends State<Profilepage> {

  String username = "";
  String email = "";
  int age = 0;
  bool loading = true;

  @override
  void initState() {
    super.initState();
    loadProfile();
  }

  Future<void> loadProfile() async {
    try {
      final res = await Apiservice.getProfile();

      if (!mounted) return;

      final user = res["userdata"];

      setState(() {
        username = user["Username"];
        email = user["Email"];
        age = int.parse(user["Age"].toString());
        loading = false;
      });
    } catch (e) {
      print("PROFILE ERROR: $e");

      logout();
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();

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
      body: loading
          ? Center(child: CircularProgressIndicator())
          : Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CircleAvatar(
              radius: 40,
              child: Icon(Icons.person, size: 40),
            ),
            SizedBox(height: 15),

            Text(
              username,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(email),
            Text("Age: $age"),
          ],
        ),
      ),
    );
  }
}
