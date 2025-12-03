import hashlib


print("\n--- Update Website Password ---\n")
new_password = input("Enter NEW password: ")


new_hash = hashlib.sha256(new_password.encode()).hexdigest()


config_path = "config.js"

with open(config_path, "w") as f:
    f.write(f'const storedHash = "{new_hash}";\n')

print("\n✔ Password updated successfully!")
print(f"✔ New SHA-256 Hash: {new_hash}")
print("✔ config.js updated.\n")

