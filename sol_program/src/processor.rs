use borsh::BorshDeserialize;
use solana_program::account_info::AccountInfo;
use solana_program::entrypoint::ProgramResult;
use solana_program::msg;
use solana_program::program_error::ProgramError;
use solana_program::pubkey::Pubkey;

use crate::error::InfinityCubeError;
use crate::instruction::InfinityCubeInstruction;

pub struct Processor;
pub mod init;
pub mod verify;

impl Processor {
    pub fn process_instruction(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        insn_data: &[u8],
    ) -> ProgramResult {
        msg!("Program id: {:?}", program_id);

        msg!("Accounts:");
        for acc in accounts.iter() {
            msg!("{:?}", acc.key);
        }

        let insn_decode_res = InfinityCubeInstruction::try_from_slice(insn_data);
        if insn_decode_res.is_err() {
            return Err(ProgramError::from(InfinityCubeError::InvalidInstruction));
        }

        let insn = insn_decode_res.unwrap();

        match insn {
            InfinityCubeInstruction::Init {
                soo_exp,
                soo_mod_pow,
            } => Self::init(accounts, soo_exp, soo_mod_pow),
            InfinityCubeInstruction::Verify { soo_exp, soo, long, lat } => {
                Self::verify(accounts, soo_exp, soo, long, lat)
            }
        }
    }
}
