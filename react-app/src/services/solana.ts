import * as solanaWeb3 from '@solana/web3.js';
import * as SPL from '@solana/spl-token';
import {expo, expoMod} from './utility'
let keypair: solanaWeb3.Signer;
let connection: solanaWeb3.Connection ;

var programPubkey=new solanaWeb3.PublicKey("3ZiQSQ1b3FbEWW6AtEob81aSmphZzvymUSPqjCrzCvgH");

const establishConnection = async () =>{
   let rpcUrl="https://api.testnet.solana.com";
   connection = new solanaWeb3.Connection(rpcUrl, 'confirmed');   
   console.log('Connection to cluster established:', rpcUrl);
}
/*
    Note: connection getLatestBlockhash is not working so we have to use our local account as the payer for transactions
    Pubkey: DDPtJZWk52j4JGmJg2GeFXY6ds9rcKUR1Sr1FGWpGAb4
    The error can be found  https://drive.google.com/drive/folders/1vnPQsltUDLqwW4cGuHhOWayHRxP1ut4m?usp=sharing
*/
const getOurAccount = async () => {
    let secretKey = Uint8Array.from(   [149,211,241,44,42,212,79,52,30,235,238,130,68,115,205,197,211,234,75,146,227,67,151,34,59,40,195,112,231,19,123,29,181,121,22,164,105,197,194,41,83,81,109,60,246,156,238,91,186,0,46,129,24,220,81,216,165,32,0,130,237,124,78,35])
    let account = solanaWeb3.Keypair.fromSecretKey(secretKey)
  
    console.log('Our account:', account.publicKey.toBase58())
  
    return account
  }

const connectWallet = async () => {
   let secretKey = Uint8Array.from(   [149,211,241,44,42,212,79,52,30,235,238,130,68,115,205,197,211,234,75,146,227,67,151,34,59,40,195,112,231,19,123,29,181,121,22,164,105,197,194,41,83,81,109,60,246,156,238,91,186,0,46,129,24,220,81,216,165,32,0,130,237,124,78,35]
 );
   keypair = solanaWeb3.Keypair.fromSecretKey(secretKey);
   console.log('keypair created');
}

const airdrop = async () => {
    let account = await getOurAccount();
    let airdropSignature = await connection.requestAirdrop(
    account.publicKey,
     solanaWeb3.LAMPORTS_PER_SOL,
    );
    await connection.confirmTransaction(airdropSignature);
    let balance = await connection.getBalance(account.publicKey);
    console.log(`balance: ${balance}`);
};

const createPDAAccount = async () => {
   let splaccount = solanaWeb3.Keypair.generate();
   const transaction = new solanaWeb3.Transaction();
   const instruction = solanaWeb3.SystemProgram.createAccount({
      fromPubkey: keypair.publicKey,
      newAccountPubkey: splaccount.publicKey,
      space: 165,
      lamports: 1000,
      programId: programPubkey,
   });
   transaction.add(instruction);
   var signature = await solanaWeb3.sendAndConfirmTransaction(
      connection, 
      transaction, 
      [keypair, splaccount]);
   console.log(signature);
}
const balance = async () => {
   let balance = await connection.getBalance(keypair.publicKey);
   console.log (keypair.publicKey.toString());
   console.log(`balance: ${balance}`);
}

function toUTF8Array(str: string) {
    let utf8 = []; 
    for (let i = 0; i < str.length; i++) {
        let charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18),
                      0x80 | ((charcode>>12) & 0x3f),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}
const findMint = async (soo: string, exp: number)=>{
    let buffer2 = new ArrayBuffer(17);
    let view2 = new Uint8Array(buffer2); 
    let x = BigInt(soo)
    let y = BigInt(exp)
    let mod = expo(BigInt(2), BigInt(64))
    let temp = expoMod(x,y,mod)
    let mint = toUTF8Array('cube_mint');
    for ( var index = 0; index < 9; index ++ ) {
        let byte = mint[index] & 0xff;
        view2 [ index ] = byte;
    }
    for ( var index = 9; index < 17; index ++ ) {
        let byte = temp & BigInt(0xff);
        view2 [ index ] = Number(byte);
        temp = (temp - byte) / BigInt(256) ;
    }
    let a, b;
    [a,b]= await solanaWeb3.PublicKey.findProgramAddress([view2], programPubkey)
    return a
}
const toUInt64 = (number: any) => {
    let bigInteger;
    if( typeof number === "bigint"){
        bigInteger = number;
    }
    else{
        bigInteger = BigInt(number);
    }
    
    return BigInt.asUintN(64, bigInteger);
    // ↪ 0n
    // zero because of overflow
}
export const createSeed = async (soo: string, exp: number)=>{

    let buffer2 = new ArrayBuffer(8);
    let view2 = new Uint8Array(buffer2); 
    let x = BigInt(soo)
    let y = BigInt(exp)
    let mod = expo(BigInt(2), BigInt(64))
    let temp = expoMod(x,y,mod)
    for ( var index = 0; index < 8; index ++ ) {
        var byte = temp & BigInt(0xff);
        view2 [ index ] = Number(byte);
        temp = (temp - byte) / BigInt(256) ;
    }
    let a, b;
    [a,b]= await solanaWeb3.PublicKey.findProgramAddress([view2], programPubkey)
    return a
}

const createInitInstruction = (soo: string, exp: number)=>{

    let buffer2 = new ArrayBuffer(13);
    let view2 = new Uint8Array(buffer2); 
    let x = BigInt(soo)
    let y = BigInt(exp)
    let mod = expo(BigInt(2), BigInt(64))
    let temp = expo(x,y) % mod
    view2[0] = 0;
    for ( var index = 1; index < 5; index ++ ) {
        var byte = exp & 0xff;
        view2 [ index ] = byte;
        exp = (exp - byte) / 256 ;
    }
    for ( var index = 5; index <= 12; index ++ ) {
        let byte = temp & toUInt64(0xff);
        view2 [ index ] = Number(byte);
        temp = (temp - byte) / toUInt64(256) ;
    }
    return view2
}
const createVerifyInstruction = (soo: string, exp: number, long: number, lat: number)=>{
    let buffer = new ArrayBuffer(21);
    let view = new Uint8Array(buffer); 
    let temp = BigInt(soo)
    // long and lat > -90 < 90, 7 point decimal => (90 -x) times 10,000,000
    view[0] = 1;
    let convertedLong = (90-long) *10000000
    let convertedLat = (90-long) *10000000
    for ( var index = 1; index < 5; index ++ ) {
        var byte = exp & 0xff;
        view [ index ] = byte;
        exp = (exp - byte) / 256 ;
    }
    for ( var index = 5; index < 13; index ++ ) {
        let byte = temp & toUInt64(0xff);
        view [ index ] = Number(byte);
        temp = (temp - byte) / toUInt64(256) ;
    }
    for ( var index = 13; index < 17; index ++ ) {
        let byte = convertedLong & 0xff;
        view [ index ] = Number(byte);
        convertedLong = (convertedLong - byte) / 256 ;
    }
    for ( var index = 17; index < 21; index ++ ) {
        let byte = convertedLat & 0xff;
        view [ index ] = Number(byte);
        convertedLat = (convertedLat - byte) / 256 ;
    }
    return view;
}
// payer: solanaWeb3.PublicKey,
// tokenMintAddress: solanaWeb3.PublicKey: Promise<solanaWeb3.PublicKey> 
async function findAssociatedTokenAddress(
    payer: solanaWeb3.PublicKey,
    tokenMintAddress: solanaWeb3.PublicKey
): Promise<solanaWeb3.PublicKey> {
    return (await solanaWeb3.PublicKey.findProgramAddress(
        [
            payer.toBuffer(),
            SPL.TOKEN_PROGRAM_ID.toBuffer(),
            tokenMintAddress.toBuffer(),
        ],
        SPL.ASSOCIATED_TOKEN_PROGRAM_ID
    ))[0];
}
const exp = 63;
export const sendData = async (soo: string) => {
    await establishConnection()
    let ourAccount = await getOurAccount();
    const balBefore = await connection.getBalance( ourAccount.publicKey )
    let data = (await createInitInstruction(soo, exp))
    let seed =  await createSeed(soo, exp)
    let mint = await findMint(soo, exp)

    const instruction = new solanaWeb3.TransactionInstruction({
        keys: [
            {pubkey: ourAccount.publicKey, isSigner: true, isWritable: true},
            {pubkey: solanaWeb3.SystemProgram.programId, isSigner: false, isWritable: false},
            {pubkey: seed, isSigner: false, isWritable: true},
            {pubkey: SPL.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
            {pubkey: mint, isSigner: false, isWritable: true},
            {pubkey: solanaWeb3.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
        ],
        programId: programPubkey,
        data: Buffer.from(data),
      });
      
      let transactions = new solanaWeb3.Transaction()
      transactions.add(instruction)
      try{
        await solanaWeb3.sendAndConfirmTransaction(
            connection,
            transactions,
            [ourAccount],
        );
      }
      catch(e){
          console.log(e)
      }
      
      const balAfter = await connection.getBalance( ourAccount.publicKey )
    
      const cost = balBefore - balAfter
    
      console.log("Cost:",cost)
}
export const verifyData = async (soo:string, exp:number, long:number, lat: number)=>{
    await establishConnection()
    let ourAccount = await getOurAccount();
    const balBefore = await connection.getBalance( ourAccount.publicKey )
    let seed =  await createSeed(soo, exp)
    let mint = await findMint(soo, exp)
    const instruction = new solanaWeb3.TransactionInstruction({
        keys: [
            {pubkey: ourAccount.publicKey, isSigner: true, isWritable: true},
            {pubkey: seed, isSigner: false, isWritable: true},
            {pubkey: mint, isSigner: false, isWritable: true},
            {pubkey: (await findAssociatedTokenAddress(ourAccount.publicKey, mint)), isSigner: false, isWritable: true},
            {pubkey: SPL.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
            {pubkey: SPL.ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
            {pubkey: solanaWeb3.SystemProgram.programId, isSigner: false, isWritable: false},
            {pubkey: solanaWeb3.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
        ],
        programId: programPubkey,
        data: Buffer.from(createVerifyInstruction(soo, exp, long, lat)),
      });
      let transactions = new solanaWeb3.Transaction()
      transactions.add(instruction)
      try{
        await solanaWeb3.sendAndConfirmTransaction(
            connection,
            transactions,
            [ourAccount],
        );
      }
      catch(e){
          console.log(e)
          const balAfter = await connection.getBalance( ourAccount.publicKey )
        
          const cost = balBefore - balAfter
        
          console.log("Cost:",cost)
          return 0; //return failed
      }
      
      const balAfter = await connection.getBalance( ourAccount.publicKey )
    
      const cost = balBefore - balAfter
    
      console.log("Cost:",cost)
      return 1; //success
}

// establishConnection();
// connectWallet();
// balance();
// getOurAccount();


