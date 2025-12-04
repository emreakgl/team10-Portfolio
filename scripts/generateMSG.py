import os
from datetime import datetime

MESSAGE_DIR = "../protected/messages/"


os.makedirs(MESSAGE_DIR, exist_ok=True)


sender = input("Sender Name: ")
email = input("Sender Email: ")
message = input("Message: ")

timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
filename_time = datetime.now().strftime("%Y%m%d_%H%M%S")

filename = f"msg_{filename_time}.html"
filepath = os.path.join(MESSAGE_DIR, filename)


# ==============================
# HTML TEMPLATE
# ==============================

html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Message from {sender}</title>
    <link rel="stylesheet" href="../../assets/style.css">
</head>

<body>
    <h2>Message from: {sender}</h2>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Received:</strong> {timestamp}</p>

    <h3>Message:</h3>
    <p>{message}</p>
</body>
</html>
"""

# ==============================
# WRITE FILE
# ==============================

with open(filepath, "w") as f:
    f.write(html_content)

print(f"\n✔ Message saved as: {filepath}")
print("✔ Add this filename to auth.js in the message list.\n")

