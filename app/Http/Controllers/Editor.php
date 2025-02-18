<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Editor extends Controller
{
    public function setup()
    {
        return view('editor.setup');
    }

    public function result(Request $request)
    {

        return view('editor.labels-set');
    }
}
