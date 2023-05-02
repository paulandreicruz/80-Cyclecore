import { Grid, Box, Typography } from "@mui/material";

function OrdersCard({ o }) {
  return (
    <div className="md:ml-32 font-bebas">
      <Grid
        container
        display="flex"
        spacing={5}
        rowGap={5}
        className="mb-14 mx-auto"
      >
        <Grid item md={4}>
          <Box>{o?._id}</Box>
          {o.ordernumber}
        </Grid>

        <Grid item md={8} alignContent="center" justifyItems="center">
          <Box className="text-left space-y-5">
            <Box>
              <h1 className="text-3xl font-semibold tracking-wider"></h1>
            </Box>
            <Box>
              <Typography>
                <span className="font-bebas tracking-wide">asdasd</span>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrdersCard;
