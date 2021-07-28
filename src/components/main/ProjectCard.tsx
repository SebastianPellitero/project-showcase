import { StyledCard } from './Dashboard.styles.js';
import { Iproject } from '../../context/ProjectProvider';
import noImage from '../../noimage.png';

const ProjectCard = (props: { project: Iproject; setProjectSelected: Function }) => {
    const { project, setProjectSelected } = props;
    return (
        <StyledCard>
            <button onClick={() => setProjectSelected(project)}>
                <img src={noImage} alt='NoImage placeholder' />
                <p>{project.created_on}</p>
                <h3>{project.name}</h3>
            </button>
        </StyledCard>
    );
};

export default ProjectCard;
