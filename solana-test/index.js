const solanaWeb3 = require('@solana/web3.js');
const fs = require( 'mz/fs');
let keypair;
let connection;
programId=new solanaWeb3.PublicKey("jEqhgsBVjEucquhvxPqEThDRbtqxbtQYFVgARnfv3Ng");

const establishConnection = async () =>{
   rpcUrl="https://api.devnet.solana.com";
   connection = new solanaWeb3.Connection(rpcUrl, 'confirmed');   
   console.log('Connection to cluster established:', rpcUrl);
}

const getOurAccount = async () => {

    const keypairFile = "./file.json"
  
    if( ! fs.existsSync(keypairFile) ) {
      console.log("The expected keypair file",keypairFile,"was not found")
      process.exit(1)
    }
  
    const secret = JSON.parse( await fs.readFile( keypairFile ))
    const account = new solanaWeb3.Account( secret )
  
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
   splaccount = solanaWeb3.Keypair.generate();
   const transaction = new solanaWeb3.Transaction();
   const instruction = solanaWeb3.SystemProgram.createAccount({
      fromPubkey: keypair.publicKey,
      newAccountPubkey: splaccount.publicKey,
      space: 165,
      lamports: 1000,
      programId,
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

const toUInt64 = (number) => {
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
longTo9ByteArray = function(/*long*/long, data) {
    // we want to represent the input as a 9-bytes array
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    for ( var index = 0; index < byteArray.length; index ++ ) {
        var byte = long & 0xff;
        byteArray [ index ] = byte;
        long = (long - byte) / 256 ;
    }

    return byteArray;
};

byteArrayToLong = function(/*byte[]*/byteArray) {
    var value = 0;
    for ( var i = byteArray.length - 1; i >= 0; i--) {
        value = (value * 256) + byteArray[i];
    }

    return value;
};
const createSeed = async (soo, exp)=>{
    let buffer2 = new ArrayBuffer(8);
    let view2 = new Uint8Array(buffer2); 
    let x = BigInt(soo)
    let y = BigInt(exp)
    let mod = 2n **64n
    let temp = (x** y) % mod
    for ( var index = 0; index < 8; index ++ ) {
        var byte = temp & 0xffn;
        view2 [ index ] = Number(byte);
        temp = (temp - byte) / 256n ;
    }
    let a, b;
    try{
        [a,b]= await solanaWeb3.PublicKey.findProgramAddress([view2], programId)
    }
    catch(e){
        console.log(e)
    }
    return a
}
// const createInitInstruction = (long, data)=>{
//     let buffer = new ArrayBuffer(9);
//     let view = new Uint8Array(buffer); 

//     for ( var index = 0; index < 8; index ++ ) {
//         var byte = long & 0xff;
//         view [ index ] = byte;
//         long = (long - byte) / 256 ;
//     }
//     view[8] = data & 0xff ;
//     return view;
// }
const createInitInstruction = async (soo, exp)=>{

    let buffer2 = new ArrayBuffer(12);
    let view2 = new Uint8Array(buffer2); 
    let x = BigInt(soo)
    let y = BigInt(exp)
    let mod = 2n **64n
    let temp = (x** y) % mod
    console.log(temp)

    for ( var index = 0; index < 4; index ++ ) {
        var byte = exp & 0xff;
        view2 [ index ] = byte;
        exp = (exp - byte) / 256 ;
    }
    for ( var index = 4; index < 12; index ++ ) {
        var byte = temp & 0xffn;
        view2 [ index ] = Number(byte);
        temp = (temp - byte) / 256n ;
    }
    let a, b;
    try{
        [a,b]= await solanaWeb3.PublicKey.findProgramAddress([view2], programId)
    }
    catch(e){
        console.log(e)
    }
    return view2
}
const createVerifyInstruction = (soo, exp)=>{
    let buffer = new ArrayBuffer(12);
    let view = new Uint8Array(buffer); 

    for ( var index = 0; index < 4; index ++ ) {
        var byte = exp & 0xff;
        view [ index ] = byte;
        exp = (exp - byte) / 256 ;
    }
    for ( var index = 4; index < 12; index ++ ) {
        var byte = soo & 0xff;
        view [ index ] = byte;
        soo = (soo - byte) / 256 ;
    }
    return view;
}

const sendData = async () => {
    await establishConnection()
    let ourAccount = await getOurAccount();
    // const GREETING_SEED = 'sendData';
    // greetedPubkey = await solanaWeb3.PublicKey.createWithSeed(
    //     ourAccount.publicKey,
    //     GREETING_SEED,
    //     programId,
    // );
    // const greetedAccount = await connection.getAccountInfo(greetedPubkey);
    // if (greetedAccount === null) {
    //     console.log(
    //     'Creating account',
    //     greetedPubkey.toBase58(),
    //     'to say hello to',
    //     );
    //     await airdrop()
    //     const lamports = await connection.getMinimumBalanceForRentExemption(
    //     100,
    //     );
    //     let keypair = solanaWeb3.Keypair.generate();

    //     const transaction = new solanaWeb3.Transaction().add(
    //     solanaWeb3.SystemProgram.createAccountWithSeed({
    //         fromPubkey: ourAccount.publicKey,
    //         basePubkey: ourAccount.publicKey,
    //         seed: GREETING_SEED,
    //         newAccountPubkey: greetedPubkey,
    //         lamports,
    //         space: 100,
    //         programId,
    //     }),
    //     );
    //     await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [ourAccount]);
    //     let airdropSignature = await connection.requestAirdrop(
    //             greetedPubkey,
    //             solanaWeb3.LAMPORTS_PER_SOL,
    //     );
    //     await connection.confirmTransaction(airdropSignature);
    //         let balance = await connection.getBalance(greetedPubkey);
    //         console.log(`balance: ${balance}`);
        
    // }
    const balBefore = await connection.getBalance( ourAccount.publicKey )
    
    let seed =  await createSeed(4237, 63)
    const instruction = new solanaWeb3.TransactionInstruction({
        keys: [
            {pubkey: ourAccount.publicKey, isSigner: true, isWritable: true},
            {pubkey: programId, isSigner: false, isWritable: false},
            {pubkey: seed, isSigner: false, isWritable: true},
            {pubkey: solanaWeb3.SystemProgram.programId, isSigner: false, isWritable: false}

        ],
        programId,
        data: [0, ...createInitInstruction(4237, 63)],
      });

    const instruction2 = new solanaWeb3.TransactionInstruction({
        keys: [
            {pubkey: seed, isSigner: false, isWritable: true},
            {pubkey: ourAccount.publicKey, isSigner: true, isWritable: true}],
        programId,
        data: [1, ...createVerifyInstruction(4237, 63)],
      });
      transactions = new solanaWeb3.Transaction()
      transactions.add(instruction)
      transactions.add(instruction2)
      try{
        await solanaWeb3.sendAndConfirmTransaction(
            connection,
            transactions,
            [ourAccount],
        );
        //supposed to return wrong
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
sendData()

// establishConnection();
// connectWallet();
// balance();
// getOurAccount();


