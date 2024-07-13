import styled from 'styled-components';

export interface LupaProps {
  x: number;
  y: number;
  id: string;
}

const size = 750;

const StyledLupa = styled.img<LupaProps>`
  width: ${size}px;
  height: ${size}px;
  position: absolute;
  top: ${({ y }) => y - size / 2 + 95}px;
  left: ${({ x }) => x - size / 2 + 95}px;
  z-index: 10000;
`;

export const Lupa = ({ x, y, id }: LupaProps) => {
  return <StyledLupa id={id} x={x} y={y} src="/lupa.png" alt="lupa" />;
};
