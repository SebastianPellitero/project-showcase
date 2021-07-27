import { StyledBox } from './styles.js'

const ProjectBox = (props:any) => {
    const { value, setProjectSelected } = props
    return (
        <StyledBox onClick={() => setProjectSelected(value)}>
            <p>{value.id}</p>
            <p>{value.name}</p>
            <p>{value.created_on}</p>
        </StyledBox>
    )
}

export default ProjectBox;