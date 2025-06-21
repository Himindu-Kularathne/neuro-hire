import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Tooltip,
  Paper,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDrop, useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useResume } from "../../../context/ResumeContext";

interface Props {
  onSubmit: () => void;
  onPrev: () => void;
}

const ItemType = {
  RESUME: "resume",
};

const DraggableResumeCard = ({ preview }: { preview: any }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemType.RESUME,
    item: { name: preview.name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={dragRef}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        boxShadow: 4, // Default shadow
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 24px rgba(33, 150, 243, 0.3)",
        },
        borderRadius: 3,
      }}
    >
      {preview.src ? (
        <CardMedia
          component="img"
          height="180"
          image={preview.src}
          alt={preview.name}
        />
      ) : (
        <Box
          sx={{
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No Preview Available
          </Typography>
        </Box>
      )}
      <CardContent>
        <Tooltip title={preview.name}>
          <Typography
            variant="body2"
            fontWeight="medium"
            noWrap
            color="text.primary"
          >
            {preview.name}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

const TrashBin = ({ onDrop }: { onDrop: (name: string) => void }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemType.RESUME,
    drop: (item: { name: string }) => onDrop(item.name),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={dropRef}
      sx={{
        mt: 4,
        height: 120,
        border: "2px dashed #ccc",
        borderRadius: 2,
        backgroundColor: isOver ? "#ffecec" : "#fafafa",
        color: isOver ? "red" : "text.secondary",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: "medium",
        transition: "background-color 0.3s",
      }}
    >
      <DeleteIcon sx={{ mr: 1 }} />
      {isOver ? "Drop here to remove" : "Drag resumes here to remove"}
    </Box>
  );
};

const StepPreview: React.FC<Props> = ({ onSubmit, onPrev }) => {
  const theme = useTheme();
  const { filePreviews, selectedJob, setFilePreviews } = useResume();

  const handleRemoveResume = (name: string) => {
    setFilePreviews((prev: any[]) => prev.filter((file) => file.name !== name));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ width: "100%", p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Preview Resume Submission
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Here's a summary of your selected job and uploaded resumes.
        </Typography>

        {/* Selected Job with enhanced design */}
        {selectedJob && (
          <Box
            sx={{
              mb: 5,
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              {selectedJob.job_name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Experience Required: {selectedJob.experience}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {selectedJob.description}
            </Typography>
          </Box>
        )}

        {/* Resume Previews */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Uploaded Resumes
        </Typography>
        <Grid container spacing={3}>
          {filePreviews.map((preview: any) => (
            <Grid item xs={12} sm={6} md={2} key={preview.name}>
              <DraggableResumeCard preview={preview} />
            </Grid>
          ))}
        </Grid>

        <TrashBin onDrop={handleRemoveResume} />

        <Divider sx={{ my: 5 }} />

        {/* Navigation and Submit Buttons */}
        <Box display="flex" justifyContent="space-between">
          <Button
            onClick={onPrev}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onSubmit}
            sx={{ px: 5, py: 1.5, borderRadius: 2 }}
            startIcon={<SendIcon />}
          >
            Submit to Screening Engine
          </Button>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default StepPreview;
