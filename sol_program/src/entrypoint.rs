use solana_program::account_info::AccountInfo;
use solana_program::entrypoint;
use solana_program::entrypoint::ProgramResult;
use solana_program::msg;
use solana_program::pubkey::Pubkey;

entrypoint!(program_entrypoint);
fn program_entrypoint(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    insn_data: &[u8],
) -> ProgramResult {
    msg!("Program was invoked!");
    crate::processor::Processor::process_instruction(program_id, accounts, insn_data)
}
