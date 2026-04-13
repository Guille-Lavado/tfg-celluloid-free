<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Obra;

class ObraController extends Controller
{
    /**
     * Obtener todas las Obras
     */
    public function index(Request $request)
    {
        $nombre = $request['nombre'] ?? '';
        $genero = $request['genero'] ?? '';
        $director = $request['director'] ?? '';

        $obras = Obra::with(['genero', 'director']);

        // Filtrar obras si exite el parámetro nombre, genero o director
        if ($nombre) {
            $obras = $obras->where('titulo', 'like', "%{$nombre}%");
        } elseif ($genero) {
            $obras = $obras->whereHas('genero', fn($q) => $q->where('nombre', 'like', "%{$genero}%"));
        } elseif ($director) {
            $obras = $obras->whereHas('director', fn($q) => $q->where('nombre', 'like', "%{$director}%"));
        } 

        $obras = $obras->orderBy('created_at', 'desc')->get();
        $res_obra = [];

        // Mostrar solo la información necesaria
        foreach($obras as $obra) {
            $res_obra[] = [
                'id' => $obra['id'],
                'nombre' => $obra['titulo'],
                'fecha de nacimiento' => $obra['sinopsis'],
                'biografia' => $obra['poster'],
                'genero' => $obra['genero']['nombre'],
                'director' => $obra['director']['nombre'],
            ];
        }

        return response()->json($res_obra, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Obterner Obra por Id
     */
    public function show($id)
    {
        $obra = Obra::with(['genero', 'director', 'peliVideo.videometraje', 'capitulosVideo.videometraje'])
            ->findOrFail($id);
 
        return response()->json($obra, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}
