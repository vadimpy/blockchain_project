use infinity_cube::instruction::InfinityCubeInstruction;
use solana_program_test::processor;
use solana_program_test::ProgramTest;
use solana_sdk::instruction::Instruction;
use solana_sdk::signature::Signer;
use solana_sdk::transaction::Transaction;

use infinity_cube;

#[tokio::test]
async fn test() {
    let program_test = ProgramTest::new(
        "infinity_cube",
        infinity_cube::id(),
        processor!(infinity_cube::processor::Processor::process_instruction),
    );
    let (mut banks_client, payer, recent_blockhash) = program_test.start().await;

    let soo = 4324;
    let soo_exp = 123;

    let insns: &[Instruction] = &[
        InfinityCubeInstruction::create_init_instruction(soo_exp, soo, &payer.pubkey()),
        InfinityCubeInstruction::create_verify_instruction(soo_exp, soo, 333, 777, &payer.pubkey()),
        InfinityCubeInstruction::create_verify_instruction(soo_exp, soo, 9, 9, &payer.pubkey()),
    ];

    let txn = Transaction::new_signed_with_payer(
        insns,
        Some(&payer.pubkey()),
        &[&payer],
        recent_blockhash,
    );

    banks_client.process_transaction(txn).await.unwrap_err();
}
