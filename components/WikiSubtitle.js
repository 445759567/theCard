import NormalText from "./normalText";


export const WikiSubtitle = ({...props}) =>{
    return(
        <NormalText font={'bold'} fontSize={18}>{props.children}</NormalText>
    )
}