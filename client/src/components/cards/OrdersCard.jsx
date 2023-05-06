import { Grid, Box, Typography } from "@mui/material";

function OrdersCard({ o }) {
  console.log(o);
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
          <Typography>{o.buyer?.firstname}</Typography>
        </Grid>

        {o?.products?.map((p, i) => (
          <div key={i}>
            <div>{p.name}</div>
          </div>
        ))}

        <Grid item md={8} alignContent="center" justifyItems="center">
          <Box className="text-left space-y-5">
            <Box>
              <h1 className="text-3xl font-semibold tracking-wider"></h1>
            </Box>
            <Box>
              <Typography>
                <span className="font-bebas tracking-wide"></span>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrdersCard;
