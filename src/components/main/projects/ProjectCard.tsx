import { StyledCard } from './ProjectCard.styles';
import { Iproject } from 'src/context/ProjectProvider';
import noImage from 'src/noimage.png';

const ProjectCard = (props: { project: Iproject; setProjectSelected: Function }) => {
    const { project, setProjectSelected } = props;
    return (
        <StyledCard
            className='projectCard'
            onClick={() => setProjectSelected(project)}
        >
            <img src={noImage} alt='NoImage placeholder' />
            <p>{project.created_on}</p>
            <h3>{project.name}</h3>
        </StyledCard>
    );
};

export default ProjectCard;