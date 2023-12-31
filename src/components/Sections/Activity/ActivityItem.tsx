import styled from "@emotion/styled/macro";
import { Theme, Typography } from "@mui/material";
import React from "react";
import useWindowDim from "utils/hooks/useWindowDim";

export interface ImageDescriptor {
    image: string
    position: {
        locX: number
        locY: number
    }
}

export interface IActivityItemProps {
    index: number
    img: ImageDescriptor,
    title: string,
    description: string[]
}

function ActivityItem({ index, img, title, description }: IActivityItemProps) {
    const { width } = useWindowDim();


    return (
        <StyledActivityItem windowWidth={width} img={img}>
            <StyledBottomCover
                index={index} />
            <StyledCover>
                <StyledContent>
                    <StyledTitle variant="h3">
                        {title}
                    </StyledTitle>
                    <StyledDescriptionWrapper>
                        <StyledDescription>
                            {description.map((descItem, index) =>
                                <StyledListItem key={index}>
                                    <Typography variant="body1">
                                        {descItem}
                                    </Typography>
                                </StyledListItem>
                            )}
                        </StyledDescription>
                    </StyledDescriptionWrapper>
                </StyledContent>

            </StyledCover>

        </StyledActivityItem>
    );
}


const StyledDescription = styled.ul`
    position: absolute;
    width: 100%;
    left: 50%;
    transition: left 200ms ease-in-out, opacity 200ms ease-in-out;
    opacity: 0;
    transition-delay: 100ms;
    padding-right: 1rem;
    list-style: none;
    padding-left: 1rem;
`;

type StyledListItmeProps = {
    theme?: Theme
}

const StyledListItem = styled.li`
    background-color: #fff;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
    color: #000;
    box-shadow: ${({ theme }: StyledListItmeProps) => theme?.shadows[12]} 
`;

const StyledDescriptionWrapper = styled.div`
    color: #fff;
    position: relative;
    width: 100%;
    height: 100%;
`;

const StyledTitle = styled(Typography)`
    color: #fff;
    transition: top 200ms ease-in-out;
    padding: 1rem;
    justify-self: flex-end;
`;

const StyledContent = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100%;
    top: 80%;
    transition: top 200ms ease-in-out;
`;

const StyledCover = styled.div`
    
    gap: 1rem;
    width: 100%;
    height: 100%;
    /* padding: 2rem; */
    border-radius: 30px;
    background-color: transparent;
    transition: background-color 200ms ease-in-out;

    
    transition: opacity 300ms ease-in-out;

    z-index: 2;
`;

type StyledBottomCoverProps = {
    index: number
    theme?: Theme
}

const StyledBottomCover = styled.div`
    width: 100%;
    height: 100%;
    z-index: 1;

    opacity: 0;
    transition: opacity 200ms ease-in-out;
    border-radius: 30px;
    background-color: ${({ theme }: StyledBottomCoverProps) => theme?.palette.primary.main};    
`;

type StyledActivityItemProps = {
    img: ImageDescriptor
    windowWidth: number
    theme?: Theme
}

const StyledActivityItem = styled.div`
    height: 700px;
    width: 600px;
    background-image: ${({ img }: StyledActivityItemProps) => `url(${img.image})`};
    background-size: cover;
    background-position: ${({ img }: StyledActivityItemProps) => `${img.position.locX}% ${img.position.locY}%`};
    border-radius: 30px;
    box-shadow: inset 0 -120px 80px #000000a0, ${({ theme }: StyledActivityItemProps) => theme?.shadows[12]};
    position: relative;

    &:hover > ${StyledCover} > ${StyledContent} {
        top: 20px;

        @media(max-width: 400px) {
            top: 10px
        }
    }

    &:hover > ${StyledBottomCover} {
        opacity: 1;
    }

    &:hover > ${StyledCover} > ${StyledContent} > ${StyledDescriptionWrapper} > ${StyledDescription} {
        left: 0px;
        opacity: 1;
    }
    overflow: hidden;


    @media(max-width: 550px) {
        width: ${({ windowWidth }: StyledActivityItemProps) => `${windowWidth - 50}px`};
        height: ${({ windowWidth }: StyledActivityItemProps) => `${windowWidth + 50}px`};
    }
`;






export default ActivityItem;