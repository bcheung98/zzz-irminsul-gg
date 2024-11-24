import { styled, Typography, TypographyProps } from "@mui/material"

export const Text = styled(Typography)<TypographyProps>(({ theme }) => ({
    color: theme.text.main,
    fontFamily: theme.font.main.family,
    fontWeight: theme.font.main.weight
}))

export const TextStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
    color: theme.text.main,
    fontFamily: theme.font.styled.family,
    fontWeight: theme.font.styled.weight
}))