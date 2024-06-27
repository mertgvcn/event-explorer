import { Box, Card, Typography, styled } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Categories } from '../../../redux/features/event/eventData'

const StatsWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    padding: 16,
    boxSizing: 'border-box'
})

const StyledCard = styled(Card)({
    width: 100
})

const StyledCardContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: 'center',
    textAlign: 'center',
    padding: 8,
    boxSizing: 'border-box',
    backgroundColor: "rgb(250,250,250)"
})

const Stats = () => {
    const { events } = useSelector(state => state.event)

    return (
        <StatsWrapper>
            <StyledCard>
                <StyledCardContent>
                    <Typography variant='subtitle2' fontSize={16}>Total Events</Typography>
                    <Typography component="span" fontSize={24}>{events.length}</Typography>
                </StyledCardContent>
            </StyledCard>
            <StyledCard>
                <StyledCardContent>
                    <Typography variant='subtitle2' fontSize={16}>Available Events</Typography>
                    <Typography component="span" fontSize={24}>{events.filter(event => event.isActive == true).length}</Typography>
                </StyledCardContent>
            </StyledCard>
            <StyledCard>
                <StyledCardContent>
                    <Typography variant='subtitle2' fontSize={16}>Unavailable Events</Typography>
                    <Typography component="span" fontSize={24}>{events.filter(event => event.isActive == false).length}</Typography>
                </StyledCardContent>
            </StyledCard>

            {Categories.map((category, idx) => (
                <StyledCard key={idx}>
                    <StyledCardContent>
                        <Typography variant='subtitle2' fontSize={16}>{category}</Typography>
                        <Typography component="span" fontSize={24}>{events.filter(event => event.category == category).length}</Typography>
                    </StyledCardContent>
                </StyledCard>
            ))}
        </StatsWrapper>
    )
}

export default Stats