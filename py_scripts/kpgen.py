import base58 as b58
import ed25519
import json

def main():
    keypair, pubkey = ed25519.create_keypair()
    secret = keypair.to_bytes()[:32]
    print("Keypair:", str(b58.b58encode(keypair.to_bytes()))[2:-1])
    print("Pubkey:", str(b58.b58encode(pubkey.to_bytes()))[2:-1])
    print("Secret:", str(b58.b58encode(secret))[2:-1])
    with open('keypair.json', 'w') as f:
        json.dump(list(keypair.to_bytes()), f)

if __name__ == '__main__':
    main()
