use solana_program::instruction::AccountMeta;
use solana_program::instruction::Instruction;
use solana_program::pubkey::Pubkey;
use solana_program::system_program;
use solana_program::sysvar::rent;

use spl_associated_token_account::{self, get_associated_token_address};

use crate::utils::Utils;

use borsh::{BorshDeserialize, BorshSerialize};
use spl_token;

use crate::consts;

#[derive(BorshSerialize, BorshDeserialize)]
pub enum InfinityCubeInstruction {
    Init { soo_exp: u32, soo_mod_pow: u64 },
    Verify { soo_exp: u32, soo: u64, long: i32, lat: i32 },
}

impl InfinityCubeInstruction {
    pub fn create_init_instruction(soo: u64, soo_exp: u32, payer: &Pubkey) -> Instruction {
        let soo_mod_pow = soo.wrapping_pow(soo_exp);
        let addr = Pubkey::find_program_address(&[&soo_mod_pow.to_le_bytes()], &crate::id()).0;
        let mint = Utils::get_mint_address(soo_mod_pow).0;

        let payer_meta = AccountMeta::new(*payer, true);
        let sys_prog_meta = AccountMeta::new_readonly(system_program::id(), false);
        let addr_meta = AccountMeta::new(addr, false);
        let spl_token_prog_meta = AccountMeta::new_readonly(spl_token::id(), false);
        let mint_meta = AccountMeta::new(mint, false);
        let rent_sysvar_meta = AccountMeta::new_readonly(rent::id(), false);

        let insn_data = InfinityCubeInstruction::Init {
            soo_exp,
            soo_mod_pow,
        };

        Instruction::new_with_borsh(
            crate::id(),
            &insn_data,
            vec![
                payer_meta,
                sys_prog_meta,
                addr_meta,
                spl_token_prog_meta,
                mint_meta,
                rent_sysvar_meta,
            ],
        )
    }

    pub fn create_verify_instruction(soo: u64, soo_exp: u32, long: i32, lat: i32, payer: &Pubkey) -> Instruction {
        let soo_mod_pow = soo.wrapping_pow(soo_exp);
        let soo_addr = Utils::get_soo_address(soo_mod_pow).0;
        let mint_addr = Utils::get_mint_address(soo_mod_pow).0;
        let token_addr = get_associated_token_address(&payer, &mint_addr);

        let payer_meta = AccountMeta::new(*payer, true);
        let addr_meta = AccountMeta::new(soo_addr, false);
        let mint_meta = AccountMeta::new(mint_addr, false);
        let token_addr_meta = AccountMeta::new(token_addr, false);
        let spl_tok_prog_meta = AccountMeta::new_readonly(spl_token::id(), false);
        let spl_assoc_tok_prog_meta =
            AccountMeta::new_readonly(spl_associated_token_account::id(), false);
        let sys_prog_meta = AccountMeta::new_readonly(system_program::id(), false);
        let rent_sysvar_meta = AccountMeta::new_readonly(rent::id(), false);

        let insn_data = InfinityCubeInstruction::Verify { soo_exp, soo, long, lat };

        Instruction::new_with_borsh(
            crate::id(),
            &insn_data,
            vec![
                payer_meta,
                addr_meta,
                mint_meta,
                token_addr_meta,
                spl_tok_prog_meta,
                spl_assoc_tok_prog_meta,
                sys_prog_meta,
                rent_sysvar_meta,
            ],
        )
    }
}
