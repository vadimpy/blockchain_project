use solana_program::account_info::AccountInfo;
use solana_program::entrypoint::ProgramResult;
use solana_program::program::invoke;
use solana_program::program::invoke_signed;
use solana_program::pubkey::Pubkey;
use solana_program::system_instruction;
use solana_program::sysvar::rent;

use spl_associated_token_account::{self, create_associated_token_account};

use crate::consts;

pub struct Utils;

impl Utils {
    pub fn get_mint_address(soo_mod_pow: u64) -> (Pubkey, u8) {
        Pubkey::find_program_address(
            &[consts::mint_seed, &soo_mod_pow.to_le_bytes()],
            &crate::id(),
        )
    }

    pub fn get_soo_address(soo_mod_pow: u64) -> (Pubkey, u8) {
        Pubkey::find_program_address(&[&soo_mod_pow.to_le_bytes()], &crate::id())
    }

    pub fn create_pda<'a>(
        from: &AccountInfo<'a>,
        to: &AccountInfo<'a>,
        lamports: u64,
        space: u64,
        owner: &Pubkey,
        sys_prog: &AccountInfo<'a>,
        seeds: &[&[&[u8]]],
    ) -> ProgramResult {
        let create_insn =
            system_instruction::create_account(from.key, to.key, lamports, space, owner);

        let account_infos: &[AccountInfo] = &[sys_prog.clone(), from.clone(), to.clone()];

        invoke_signed(&create_insn, account_infos, seeds)
    }

    pub fn initialize_mint<'a>(
        mint: &AccountInfo<'a>,
        mint_authority: &Pubkey,
        spl_token_prog_info: &AccountInfo<'a>,
        rent_info: &AccountInfo<'a>,
    ) -> ProgramResult {
        let init_mint_insn = spl_token::instruction::initialize_mint(
            &spl_token::id(),
            mint.key,
            mint_authority,
            None,
            0,
        )
        .unwrap();

        let account_infos: &[AccountInfo] =
            &[spl_token_prog_info.clone(), mint.clone(), rent_info.clone()];

        invoke(&init_mint_insn, account_infos)
    }

    pub fn create_token_account<'a>(
        payer: &AccountInfo<'a>,
        addr: &AccountInfo<'a>,
        mint: &AccountInfo<'a>,
        spl_assoc_tok_prog: &AccountInfo<'a>,
        spl_token_prog: &AccountInfo<'a>,
        sys_prog: &AccountInfo<'a>,
        rent: &AccountInfo<'a>,
    ) -> ProgramResult {
        let create_insn = create_associated_token_account(payer.key, payer.key, mint.key);

        let account_infos: &[AccountInfo] = &[
            spl_assoc_tok_prog.clone(),
            payer.clone(),
            addr.clone(),
            mint.clone(),
            sys_prog.clone(),
            spl_token_prog.clone(),
            rent.clone(),
        ];

        invoke(&create_insn, account_infos)
    }

    pub fn mint<'a>(
        mint: &AccountInfo<'a>,
        token_addr: &AccountInfo<'a>,
        mint_authority: &AccountInfo<'a>,
        spl_tok_prog: &AccountInfo<'a>,
        seeds: &[&[&[u8]]],
    ) -> ProgramResult {
        let mint_insn = spl_token::instruction::mint_to(
            &spl_token::id(),
            mint.key,
            token_addr.key,
            mint_authority.key,
            &[],
            1,
        )
        .unwrap();

        let account_infos: &[AccountInfo] = &[
            spl_tok_prog.clone(),
            mint.clone(),
            token_addr.clone(),
            mint_authority.clone(),
        ];

        invoke_signed(&mint_insn, account_infos, seeds)
    }
}
