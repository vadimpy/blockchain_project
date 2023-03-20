use solana_program::account_info::next_account_info;
use solana_program::account_info::AccountInfo;
use solana_program::entrypoint::ProgramResult;
use solana_program::msg;
use solana_program::program_error::ProgramError;
use solana_program::pubkey::Pubkey;

use crate::processor::Processor;
use crate::utils::Utils;

impl Processor {
    pub fn verify(accounts: &[AccountInfo], soo_exp: u32, soo: u64, long: i32, lat: i32) -> ProgramResult {
        msg!("soo_exp: {}, soo: {}", soo_exp, soo);
        let accounts_iter = &mut accounts.iter();

        let payer_info = next_account_info(accounts_iter)?;
        let addr_info = next_account_info(accounts_iter)?;
        let mint_info = next_account_info(accounts_iter)?;
        let token_addr_info = next_account_info(accounts_iter)?;
        let spl_token_prog_info = next_account_info(accounts_iter)?;
        let spl_assoc_tok_prog_info = next_account_info(accounts_iter)?;
        let sys_prog_info = next_account_info(accounts_iter)?;
        let rent_info = next_account_info(accounts_iter)?;

        if !payer_info.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        if token_addr_info.data_is_empty() {
            Utils::create_token_account(
                payer_info,
                token_addr_info,
                mint_info,
                spl_assoc_tok_prog_info,
                spl_token_prog_info,
                sys_prog_info,
                rent_info,
            )?;
        }

        let soo_mod_pow = soo.wrapping_pow(soo_exp);
        let soo_mod_pow_bytes = soo_mod_pow.to_le_bytes();

        let (addr_check, bump_seed) =
            Pubkey::find_program_address(&[&soo_mod_pow_bytes], &crate::id());
        if addr_check != *addr_info.key {
            return Err(ProgramError::InvalidAccountData);
        }

        if addr_info.data.borrow()[0] == 0 {
            let mut data = addr_info.data.borrow_mut();
            data[0] = 1;
            data[1..5].clone_from_slice(&long.to_le_bytes());
            data[5..].clone_from_slice(&lat.to_le_bytes());
            Utils::mint(
                mint_info,
                token_addr_info,
                addr_info,
                spl_token_prog_info,
                &[&[&soo_mod_pow_bytes, &[bump_seed]]],
            );
            msg!("Account was verified");
        } else {
            msg!("Accounts is already verified");
            return Err(ProgramError::AccountAlreadyInitialized);
        }
        Ok(())
    }
}
