import styled, { ThemeProvider } from "styled-components"
import { theme } from "../styles/theme"

const StyledHeader = styled.header`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 28px 36px;
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`

const Info = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
  font-weight: 500;
`

const Header = ({ title, studentCount, averageScore }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledHeader>
        <Title>{title}</Title>
        <Info>
          {studentCount} Students Enrolled | Class Average: {averageScore}%
        </Info>
      </StyledHeader>
    </ThemeProvider>
  )
}

export default Header