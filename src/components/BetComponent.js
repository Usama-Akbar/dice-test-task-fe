import * as React from 'react';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
export default function BetComponent(props) {

  return (
    <Box mt={props.mt} >
      <FormLabel
        id="storage-label"
        sx={{
          mb: 2,
          fontWeight: 'xl',
          textTransform: 'uppercase',
          fontSize: 'xs',
          letterSpacing: '0.15rem',
        }}
      >
        {props.heading}
      </FormLabel>
      <RadioGroup
        aria-labelledby={props.heading}
        size="lg"

        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        sx={{ gap: 1.5 }}
      >
        {props.types.map((value) => (
          <Sheet
            key={value}
            sx={{
              p: 2,
              borderRadius: 'md',
              boxShadow: 'sm',
            }}
          >
            <Radio
              label={`${value}`}
              overlay
              style={{ width: "100px" }}
              onChange={(e) => {
                if (props.heading === "Bet Type") {
                  props.setBetType(e.target.value)

                } else {
                  props.setBetAmount(e.target.value)
                }
              }
              }
              disableIcon
              value={value}
              slotProps={{
                label: ({ checked }) => ({
                  sx: {
                    fontWeight: 'lg',
                    fontSize: 'md',
                    color: checked ? 'text.primary' : 'text.secondary',
                  },
                }),
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      '--variant-borderWidth': '2px',
                      '&&': {
                        // && to increase the specificity to win the base :hover styles
                        borderColor: theme.vars.palette.primary[500],
                      },
                    }),
                  }),
                }),
              }}
            />
          </Sheet>
        ))}
      </RadioGroup>
    </Box>
  );
}
