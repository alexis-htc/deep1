import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-7fd64ac0/health", (c) => {
  return c.json({ status: "ok" });
});

// ============= MPA APPLICATIONS =============
// Get all MPA applications
app.get("/make-server-7fd64ac0/mpa-applications", async (c) => {
  try {
    const applications = await kv.get("mpaApplications") || [];
    return c.json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching MPA applications:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new MPA application
app.post("/make-server-7fd64ac0/mpa-applications", async (c) => {
  try {
    const body = await c.req.json();
    const applications = await kv.get("mpaApplications") || [];
    applications.push(body);
    await kv.set("mpaApplications", applications);
    return c.json({ success: true, data: body });
  } catch (error) {
    console.error("Error creating MPA application:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update MPA application
app.put("/make-server-7fd64ac0/mpa-applications/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const applications = await kv.get("mpaApplications") || [];
    const index = applications.findIndex((app: any) => app.id === id);
    if (index !== -1) {
      applications[index] = { ...applications[index], ...body };
      await kv.set("mpaApplications", applications);
      return c.json({ success: true, data: applications[index] });
    }
    return c.json({ success: false, error: "Application not found" }, 404);
  } catch (error) {
    console.error("Error updating MPA application:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= PROPOSALS =============
// Get all proposals
app.get("/make-server-7fd64ac0/proposals", async (c) => {
  try {
    const proposals = await kv.get("proposals") || [];
    return c.json({ success: true, data: proposals });
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new proposal
app.post("/make-server-7fd64ac0/proposals", async (c) => {
  try {
    const body = await c.req.json();
    const proposals = await kv.get("proposals") || [];
    proposals.push(body);
    await kv.set("proposals", proposals);
    return c.json({ success: true, data: body });
  } catch (error) {
    console.error("Error creating proposal:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update proposal
app.put("/make-server-7fd64ac0/proposals/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const proposals = await kv.get("proposals") || [];
    const index = proposals.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      proposals[index] = { ...proposals[index], ...body };
      await kv.set("proposals", proposals);
      return c.json({ success: true, data: proposals[index] });
    }
    return c.json({ success: false, error: "Proposal not found" }, 404);
  } catch (error) {
    console.error("Error updating proposal:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= WCA APPLICATIONS =============
// Get all WCA applications
app.get("/make-server-7fd64ac0/wca-applications", async (c) => {
  try {
    const applications = await kv.get("wcaApplications") || [];
    return c.json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching WCA applications:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new WCA application
app.post("/make-server-7fd64ac0/wca-applications", async (c) => {
  try {
    const body = await c.req.json();
    const applications = await kv.get("wcaApplications") || [];
    applications.push(body);
    await kv.set("wcaApplications", applications);
    return c.json({ success: true, data: body });
  } catch (error) {
    console.error("Error creating WCA application:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= RESIDUAL REPORTS =============
// Get residual report by month/year
app.get("/make-server-7fd64ac0/residuals/:monthYear", async (c) => {
  try {
    const monthYear = c.req.param("monthYear");
    const residuals = await kv.get(`residuals_${monthYear}`) || [];
    return c.json({ success: true, data: residuals });
  } catch (error) {
    console.error("Error fetching residuals:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get all residual report months
app.get("/make-server-7fd64ac0/residuals", async (c) => {
  try {
    const allMonths = await kv.get("residuals_months") || [];
    return c.json({ success: true, data: allMonths });
  } catch (error) {
    console.error("Error fetching residual months:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Upload residual report for a specific month/year
app.post("/make-server-7fd64ac0/residuals/:monthYear", async (c) => {
  try {
    const monthYear = c.req.param("monthYear");
    const body = await c.req.json();

    // Save the residuals data
    await kv.set(`residuals_${monthYear}`, body.data);

    // Update the list of available months
    const allMonths = await kv.get("residuals_months") || [];
    if (!allMonths.includes(monthYear)) {
      allMonths.push(monthYear);
      await kv.set("residuals_months", allMonths);
    }

    return c.json({ success: true, data: { monthYear, count: body.data.length } });
  } catch (error) {
    console.error("Error uploading residuals:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= PIPELINE DEALS =============
// Get all pipeline deals
app.get("/make-server-7fd64ac0/pipeline-deals", async (c) => {
  try {
    const deals = await kv.get("pipelineDeals") || [];
    return c.json({ success: true, data: deals });
  } catch (error) {
    console.error("Error fetching pipeline deals:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new pipeline deal
app.post("/make-server-7fd64ac0/pipeline-deals", async (c) => {
  try {
    const body = await c.req.json();
    const deals = await kv.get("pipelineDeals") || [];
    deals.push(body);
    await kv.set("pipelineDeals", deals);
    return c.json({ success: true, data: body });
  } catch (error) {
    console.error("Error creating pipeline deal:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update pipeline deal
app.put("/make-server-7fd64ac0/pipeline-deals/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const deals = await kv.get("pipelineDeals") || [];
    const index = deals.findIndex((deal: any) => deal.id === id);
    if (index !== -1) {
      deals[index] = { ...deals[index], ...body };
      await kv.set("pipelineDeals", deals);
      return c.json({ success: true, data: deals[index] });
    }
    return c.json({ success: false, error: "Deal not found" }, 404);
  } catch (error) {
    console.error("Error updating pipeline deal:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= PARTNERS =============
// Get all partners
app.get("/make-server-7fd64ac0/partners", async (c) => {
  try {
    const partners = await kv.get("partners") || [];
    return c.json({ success: true, data: partners });
  } catch (error) {
    console.error("Error fetching partners:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new partner
app.post("/make-server-7fd64ac0/partners", async (c) => {
  try {
    const body = await c.req.json();
    const partners = await kv.get("partners") || [];
    partners.push(body);
    await kv.set("partners", partners);
    return c.json({ success: true, data: body });
  } catch (error) {
    console.error("Error creating partner:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update partner
app.put("/make-server-7fd64ac0/partners/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const partners = await kv.get("partners") || [];
    const index = partners.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      partners[index] = { ...partners[index], ...body };
      await kv.set("partners", partners);
      return c.json({ success: true, data: partners[index] });
    }
    return c.json({ success: false, error: "Partner not found" }, 404);
  } catch (error) {
    console.error("Error updating partner:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Delete partner
app.delete("/make-server-7fd64ac0/partners/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const partners = await kv.get("partners") || [];
    const filtered = partners.filter((p: any) => p.id !== id);
    await kv.set("partners", filtered);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting partner:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

Deno.serve(app.fetch);