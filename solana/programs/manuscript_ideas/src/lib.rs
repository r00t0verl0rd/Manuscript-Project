use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

pub const MAX_TEXT_BYTES: usize = 512;
pub const IDEA_TYPE_HUMAN: u8 = 0;
pub const IDEA_TYPE_ROBOT: u8 = 1;

#[program]
pub mod manuscript_ideas {
    use super::*;

    /// Creates one idea record account.
    ///
    /// The current v0.1 interface intentionally has no update or delete instruction.
    /// idea_id is expected to be globally unique inside Manuscript.
    pub fn record_idea(
        ctx: Context<RecordIdea>,
        idea_id: u64,
        idea_type: u8,
        text: String,
    ) -> Result<()> {
        require!(
            idea_type == IDEA_TYPE_HUMAN || idea_type == IDEA_TYPE_ROBOT,
            ManuscriptError::InvalidIdeaType
        );
        require!(!text.trim().is_empty(), ManuscriptError::EmptyIdea);
        require!(
            text.len() <= MAX_TEXT_BYTES,
            ManuscriptError::IdeaTooLong
        );

        let idea = &mut ctx.accounts.idea;
        idea.author = ctx.accounts.author.key();
        idea.idea_id = idea_id;
        idea.idea_type = idea_type;
        idea.created_at = Clock::get()?.unix_timestamp;
        idea.text = text;
        idea.bump = ctx.bumps.idea;

        emit!(IdeaRecorded {
            idea_account: idea.key(),
            author: idea.author,
            idea_id: idea.idea_id,
            idea_type: idea.idea_type,
            created_at: idea.created_at,
        });

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(idea_id: u64)]
pub struct RecordIdea<'info> {
    #[account(
        init,
        payer = author,
        space = Idea::SPACE,
        seeds = [b"idea", &idea_id.to_le_bytes()],
        bump
    )]
    pub idea: Account<'info, Idea>,

    #[account(mut)]
    pub author: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Idea {
    /// Wallet that signed the original record transaction.
    pub author: Pubkey,

    /// Manuscript-level numeric identifier for this record.
    pub idea_id: u64,

    /// 0 = for humans, 1 = for robots.
    pub idea_type: u8,

    /// Solana cluster time recorded by the program.
    pub created_at: i64,

    /// UTF-8 idea text. Maximum: MAX_TEXT_BYTES bytes.
    pub text: String,

    /// PDA bump used for this idea account.
    pub bump: u8,
}

impl Idea {
    pub const SPACE: usize =
        8 +
        32 +
        8 +
        1 +
        8 +
        4 + MAX_TEXT_BYTES +
        1;
}

#[event]
pub struct IdeaRecorded {
    pub idea_account: Pubkey,
    pub author: Pubkey,
    pub idea_id: u64,
    pub idea_type: u8,
    pub created_at: i64,
}

#[error_code]
pub enum ManuscriptError {
    #[msg("Idea type must be 0 (human) or 1 (robot).")]
    InvalidIdeaType,

    #[msg("Idea text cannot be empty.")]
    EmptyIdea,

    #[msg("Idea text is too long.")]
    IdeaTooLong,
}
