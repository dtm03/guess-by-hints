import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const Title = styled.div`
  font-size: 64px;
  font-weight: 800;
  color: #fff;
  font-family: "Mulish", sans-serif;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const Score = styled.h1`
  font-size: 64px;
  font-weight: 800;
  color: #d5d0cd;
  font-family: "Mulish", sans-serif;
  margin-top: 200px;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 36px;
    margin-top: 100px;
  }
`;

export const RemainingGuesses = styled.p`
  font-size: 12px;
  color: #d5d0cd;
  font-family: "Mulish", sans-serif;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const BookReveal = styled.p`
  margin-top: 16px;
  font-size: 20px;
  color: #fff;
  font-family: "Mulish", sans-serif;
  font-weight: 700;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    font-size: 16px;
    margin-top: 12px;
  }
`;

export const Hint = styled.p`
  font-size: 16px;
  margin-top: 24px;
  color: #fff;
  font-family: "Mulish", sans-serif;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-top: 16px;
    padding: 0 25px;
  }
`;

// Updated GuessInputContainer
export const GuessInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d5d0cd;
  padding: 5px 5px 5px 24px;
  border-radius: 40px;
  background-color: #fff;
  margin: 40px 12px 64px 12px;
  width: 90%;
  max-width: 400px;

  @media (max-width: 480px) {
    margin: 25px 20px 20px 20px;
    padding: 5px 10px 5px 16px;
    width: 80%;
    max-width: 280px;
    min-height: 40px; /* Changed from fixed height */
    align-items: stretch; /* Ensure both elements take full height */
  }
`;

// Updated Button with box-sizing and better mobile handling
export const Button = styled.button`
  background-color: ${(props) => props.bgColor || "#7899D4"};
  color: #fff;
  border: none;
  border-radius: ${(props) => props.borderRadius || "40px"};
  padding: ${(props) => props.padding || "15px 25px"};
  font-size: ${(props) => props.fontSize || "18px"};
  font-family: "Mulish", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 800;
  cursor: pointer;
  margin-top: ${(props) => props.marginTop || "40px"};
  transition: background-color 0.3s ease;
  box-sizing: border-box; /* Added this */
  flex-shrink: 0; /* Prevent button from shrinking */
  align-self: center; /* Explicit alignment */

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    padding: 10px 20px 10px 20px; /* Slightly reduced to fit better */
    font-size: 14px;
    min-width: 60px; /* Reduced from 100px */
  }
`;

// Updated GuessInput with better mobile handling
export const GuessInput = styled.input`
  flex: 1;
  font-size: 16px;
  color: #738296;
  font-family: "Mulish", -apple-system, BlinkMacSystemFont, sans-serif;
  border: none;
  outline: none;
  background: transparent;
  height: 36px;
  line-height: 36px;
  box-sizing: border-box;

  &::placeholder {
    color: #d5d0cd;
  }

  @media (max-width: 480px) {
    margin-top: 2px;
    font-size: 15px;
    line-height: 32px;
  }
`;

export const LoadingContainer = styled(Container)`
  justify-content: center;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #ffffff33;
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    border-width: 2px;
  }
`;

export const StatsBar = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 64px;
  padding: 10px 64px;
  color: #fff;
  font-family: "Mulish", sans-serif;
  font-weight: 600;
  font-size: 14px;
  z-index: 10;

  @media (max-width: 480px) {
    padding: 6px 30px;
    font-size: 11px;
    border-radius: 36px;
    top: 10px;
    left: 10px;
    right: 10px;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;

  &.title-with-icon {
    flex-direction: row;
    align-items: center;
    gap: 12px;

    @media (max-width: 480px) {
      gap: 6px;
    }

    img {
      @media (max-width: 768px) {
        width: 60px !important;
        height: 60px !important;
        margin-right: 8px !important;
      }

      @media (max-width: 480px) {
        width: 40px !important;
        height: 40px !important;
        margin-right: 4px !important;
        border-radius: 20px !important;
      }
    }
  }

  @media (max-width: 480px) {
    gap: 1px;
    min-width: 60px;
  }
`;

export const StatLabel = styled.span`
  font-size: 12px;
  opacity: 0.8;
  text-align: center;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const StatValue = styled.span`
  font-size: 16px;
  font-weight: 800;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StyledAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  object-fit: cover;

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    max-width: 200px;
    margin-top: 15px;

    button {
      margin-top: 0 !important;
    }
  }
`;
