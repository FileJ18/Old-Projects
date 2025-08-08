package com.example.privatechat

import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var chatWindow: LinearLayout
    private lateinit var messageInput: EditText
    private lateinit var stopBtn: Button
    private var darkMode = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        chatWindow = findViewById(R.id.chatWindow)
        messageInput = findViewById(R.id.messageInput)
        stopBtn = findViewById(R.id.stopBtn)

        findViewById<Button>(R.id.sendBtn).setOnClickListener {
            val message = messageInput.text.toString()
            if (message.isNotBlank()) {
                addMessage("You: $message")
                messageInput.text.clear()
            }
        }

        findViewById<Button>(R.id.themeToggle).setOnClickListener {
            toggleTheme()
        }

        findViewById<Button>(R.id.recordBtn).setOnClickListener {
            stopBtn.visibility = View.VISIBLE
            Toast.makeText(this, "Recording...", Toast.LENGTH_SHORT).show()
        }

        stopBtn.setOnClickListener {
            stopBtn.visibility = View.GONE
            Toast.makeText(this, "Stopped Recording", Toast.LENGTH_SHORT).show()
        }

        findViewById<Button>(R.id.downloadBtn).setOnClickListener {
            Toast.makeText(this, "Chat downloaded (simulated)", Toast.LENGTH_SHORT).show()
        }

        // You can implement camera and capture logic using CameraX or Camera Intent
    }

    private fun addMessage(text: String) {
        val msg = TextView(this)
        msg.text = text
        chatWindow.addView(msg)
    }

    private fun toggleTheme() {
        darkMode = !darkMode
        val root = findViewById<View>(android.R.id.content)
        root.setBackgroundColor(if (darkMode) 0xFF222222.toInt() else 0xFFFFFFFF.toInt())
    }
}
