import { ArrowForward, Delete, Edit, Person3 } from "@mui/icons-material";
import {
  Divider,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { toTitle } from "../utils/string";
import { isEmpty } from "ramda";

export type DefaultListParam = {
  listItems: DefaultListItem[];
  handleDelete: (id: number, name: string) => void;
  handleEdit: (id: number) => void;
  emptyMessage: string;
};

export type DefaultListItem = {
  id: number;
  name: string;
  primaryText: string;
  secondaryText: string;
};

export const DefaultList = ({
  listItems,
  emptyMessage = "Parece que não há nada por aqui.",
  handleDelete,
  handleEdit,
}: DefaultListParam) => {
  return (
    <List dense={true} sx={{ display: { xs: "block", md: "none" } }}>
      {/* {"if empty"} */}
      {isEmpty(listItems) && (
        <ListItem>
          <ArrowForward sx={{ padding: 1, color: "#c2c2c2" }} />
          <ListItemText
            sx={{ color: "#00df8d" }}
            primary={toTitle(emptyMessage)}
          />
          <Divider color="#c2c2c2" />
        </ListItem>
      )}

      {listItems.map(({ primaryText, secondaryText, id, name }) => (
        <ListItem
          key={`listitem-${id}`}
          sx={{
            borderBottom: "1px solid #3f3f3f",
            "&:hover": { cursor: "pointer" },
          }}
        >
          <Grid2
            container
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid2 size={2} textAlign="center">
              <Person3 sx={{ padding: 1, color: "#d1d1d1" }} />
            </Grid2>
            <Grid2 size={7}>
              <ListItemText
                sx={{ color: "#00ff9d" }}
                primary={toTitle(primaryText)}
                secondary={toTitle(secondaryText)}
              />
            </Grid2>
            <Grid2 size={3} container>
              <Grid2 size={6}>
                <IconButton
                  onClick={() => handleEdit(id)}
                  sx={{ color: "#d1d1d1" }}
                >
                  <Edit />
                </IconButton>
              </Grid2>
              <Grid2 size={6}>
                <IconButton
                  onClick={() => handleDelete(id, name)}
                  sx={{ color: "#ff9595" }}
                >
                  <Delete />
                </IconButton>
              </Grid2>
            </Grid2>
          </Grid2>
        </ListItem>
      ))}
    </List>
  );
};
