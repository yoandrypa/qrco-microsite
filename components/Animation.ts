import { fadeInVertical } from "../helpers/animations";
// @ts-ignore
import { Flex } from "reflexbox/styled-components";
// @ts-ignore
import styled from "styled-components";
import { prop } from "styled-tools";
import { FC } from "react";

interface Props extends React.ComponentProps<typeof Flex> {
  offset: string;
  duration?: string;
}

const Animation: FC<Props> = styled(Flex)<Props>`
  animation: ${(props: Props) => fadeInVertical(props.offset)}
    ${prop("duration", "0.3s")} ease-out;
`;

export default Animation;
