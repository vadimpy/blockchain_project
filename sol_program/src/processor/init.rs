use solana_program::account_info::next_account_info;
use solana_program::account_info::AccountInfo;
use solana_program::entrypoint::ProgramResult;
use solana_program::msg;
use solana_program::program_error::ProgramError;
use solana_program::program_pack::Pack;
use solana_program::pubkey::Pubkey;
use solana_program::sysvar::rent::Rent;
use solana_program::sysvar::Sysvar;

use spl_token::state::Account as SplAccount;
use spl_token::state::Mint;

use crate::consts;
use crate::processor::Processor;
use crate::utils::Utils;

impl Processor {
    pub fn init(accounts: &[AccountInfo], soo_exp: u32, soo_mod_pow: u64) -> ProgramResult {
        msg!("soo_exp: {}, soo_mod_pow: {}", soo_exp, soo_mod_pow);
        let accounts_iter = &mut accounts.iter();

        let payer_info = next_account_info(accounts_iter)?;
        let sys_prog_info = next_account_info(accounts_iter)?;
        let addr_info = next_account_info(accounts_iter)?;
        let spl_token_prog_info = next_account_info(accounts_iter)?;
        let mint_info = next_account_info(accounts_iter)?;
        let rent_info = next_account_info(accounts_iter)?;

        let rent = Rent::from_account_info(rent_info)?;

        //let token_acc_info = next_account_info(accounts_iter)?;

        if !payer_info.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        let soo_mod_pow_bytes = soo_mod_pow.to_le_bytes();

        let (addr_check, addr_bump) =
            Pubkey::find_program_address(&[&soo_mod_pow_bytes], &crate::id());
        if addr_check != *addr_info.key {
            return Err(ProgramError::InvalidAccountData);
        }

        let (mint_check, mint_bump) = Utils::get_mint_address(soo_mod_pow);
        if mint_check != *mint_info.key {
            return Err(ProgramError::InvalidAccountData);
        }

        Utils::create_pda(
            payer_info,
            mint_info,
            rent.minimum_balance(Mint::LEN),
            Mint::LEN as u64,
            spl_token_prog_info.key,
            sys_prog_info,
            &[&[consts::mint_seed, &soo_mod_pow_bytes, &[mint_bump]]],
        )?;

        Utils::initialize_mint(mint_info, addr_info.key, spl_token_prog_info, rent_info)?;

        Utils::create_pda(
            payer_info,
            addr_info,
            rent.minimum_balance(9),
            9,
            &crate::id(),
            &sys_prog_info,
            &[&[&soo_mod_pow_bytes, &[addr_bump]]],
        )?;

        addr_info.data.borrow_mut()[0] = 0;
        msg!("Account was created");
        Ok(())
    }
}
