import { css, styled } from "styled-components"
import { scaleInEffect } from "../AnimationContainers/AnimationContainers.styles"

const CenterElementsContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const CenterElementsContainerWithScaleInEffectEffect = styled(CenterElementsContainer)`
  animation: ${scaleInEffect} 700ms ease;
`

export default CenterElementsContainer