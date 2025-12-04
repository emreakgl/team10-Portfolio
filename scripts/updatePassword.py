import hashlib

new_password = input("Enter NEW password: ")

new_hash = hashlib.sha256(new_password.encode()).hexdigest()

config_path = "config.js"

with open(config_path, "w") as f:
    f.write(f'const storedHash = "{new_hash}";\n')

