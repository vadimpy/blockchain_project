use solana_program::program_error::ProgramError;

#[repr(u32)]
pub enum InfinityCubeError {
    InvalidInstruction,
}

impl From<InfinityCubeError> for ProgramError {
    fn from(e: InfinityCubeError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
