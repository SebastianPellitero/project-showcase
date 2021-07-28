import { StyledBox } from './styles.js';
import { Iproject } from '../../context/ProjectProvider';

const ProjectBox = (props: { value: Iproject; setProjectSelected: Function }) => {
    const { value, setProjectSelected } = props;
    return (
        <StyledBox onClick={() => setProjectSelected(value)}>
            <p>{value.id}</p>
            <p>{value.name}</p>
            <p>{value.created_on}</p>
        </StyledBox>
    );
};

export default ProjectBox;
