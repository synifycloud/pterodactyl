import styled from 'styled-components/macro';
import tw from 'twin.macro';

const ContentContainer = styled.div`
    max-width: 1200px;
    ${tw`px-4 mx-auto`};
`;
ContentContainer.displayName = 'ContentContainer';

export default ContentContainer;
