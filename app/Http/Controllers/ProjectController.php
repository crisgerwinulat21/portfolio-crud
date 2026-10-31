<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::orderByDesc('date_completed')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->rules(), $this->messages());

        $validated['image'] = $request->file('image')->store('projects', 'public');

        Project::create($validated);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate($this->rules($project), $this->messages());

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($project->image);
            $validated['image'] = $request->file('image')->store('projects', 'public');
        } else {
            unset($validated['image']); // keep the current image
        }

        $project->update($validated);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        Storage::disk('public')->delete($project->image);
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }

    // All validation rules live here so store() and update() use the same ones.
    private function rules(?Project $project = null): array
    {
        return [
            'title' => ['required', 'string', 'max:100', Rule::unique('projects', 'title')->ignore($project?->id)],
            'category' => ['required', Rule::in(['mobile', 'web', 'design'])],
            'description' => ['required', 'string', 'min:20', 'max:500'],
            'tech_stack' => ['required', 'string', 'max:255'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            'date_completed' => ['required', 'date', 'before_or_equal:today'],
            // an image is required when creating, optional when editing
            'image' => [$project ? 'nullable' : 'required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    private function messages(): array
    {
        return [
            'title.required' => 'Please enter the project title.',
            'title.unique' => 'You already have a project with this title.',
            'description.min' => 'The description must be at least 20 characters so visitors understand the project.',
            'project_url.url' => 'Enter a full link that starts with http:// or https://.',
            'repository_url.url' => 'Enter a full link that starts with http:// or https://.',
            'date_completed.before_or_equal' => 'The completion date cannot be in the future.',
            'image.required' => 'Please upload a screenshot of the project.',
            'image.max' => 'The image must not be larger than 2 MB.',
        ];
    }
}