import { Database, Cpu, Target, Layers, GraduationCap, User, Calendar, Users, BarChart3, Binary } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function AboutProjectPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-primary">Academic Project Details</h1>
        <p className="text-lg text-muted-foreground mb-12">
          This project explores the application of Machine Learning in the field of healthcare, specifically focusing on
          the early screening of Autism Spectrum Disorder.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Binary className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We leverage a customized 12-layer Convolutional Neural Network (CNN) model designed to extract complex
                patterns from fMRI images. The model includes specialized pooling and normalization layers for medical
                imaging.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Database className="h-8 w-8 text-primary mb-2" />
              <CardTitle>ABIDE Dataset</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Trained on the Autism Brain Imaging Data Exchange (ABIDE) dataset, consisting of over 6,000+ labeled
                fMRI scans collected from international clinical sites, ensuring global relevance.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Model Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  <strong>Accuracy:</strong> 92.5%
                </li>
                <li>
                  <strong>F1 Score:</strong> 82.61%
                </li>
                <li>
                  <strong>Precision:</strong> 89.4%
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Target className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Project Objective</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                To develop a non-invasive, accessible, and high-accuracy screening tool that can assist parents and
                teachers in identifying potential ASD risk in children at an early stage.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Database className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Dataset Used</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                UCI Machine Learning Repository & Kaggle ASD Datasets. The model is trained on diverse clinical
                screening data covering various age groups (Toddler, Child, Adolescent, and Adult).
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Layers className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Target Age Group</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Primarily focused on children (2-10 years) where early intervention has the highest impact, with
                supporting modules for adolescent and adult screening.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Cpu className="h-8 w-8 text-primary mb-2" />
              <CardTitle>ML Methodology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We utilize a combination of Logistic Regression and Random Forest classifiers. Evaluation metrics
                include Accuracy, Precision, Recall, and F1-Score to ensure reliability.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Project Card for Viva/Academic Marks */}
        <section className="mb-16">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="text-center">
              <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Mini Project Details</CardTitle>
              <CardDescription>Academic Year 2025-26</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-background flex items-center justify-center border border-border">
                      <Layers className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">College Name</p>
                      <p className="text-sm font-bold">V0 Institute of Technology & Research</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-background flex items-center justify-center border border-border">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        Project Guide
                      </p>
                      <p className="text-sm font-bold">Prof. Alan Turing</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-background flex items-center justify-center border border-border">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Team Members</p>
                      <p className="text-sm font-bold">Member 1, Member 2, Member 3</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-background flex items-center justify-center border border-border">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Status</p>
                      <p className="text-sm font-bold">Development / Phase 2</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
