
<div class="card">
    <div class="card-body login-card-body">
        @if ($errors->any())
            @foreach ($errors->all() as $error)
                <div>{{$error}}</div>
            @endforeach
        @endif
        @error('email')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror
        @if(Session::has("status"))
            <div class="alert alert-success" role="alert">
                {{Session::get('status')}}
            </div>
        @endif
        <p class="login-box-msg">Informe seu Email para recuperação de senha</p>
        <form method="post" id="signin-form" action="{{url("/recovery")}}">
            @csrf
            <div class="input-group mb-3">
                <input type="email" name="email" id="email" class="form-control" placeholder="Email"
                    required="">
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                    </div>
                </div>
            </div>
                <div class="col-4">
                    <button type="submit" class="btn btn-primary btn-block admin-auth-btn">Enviar</button>
                </div>
                <!-- /.col -->
            </div>
        </form>

    </div>
    <!-- /.login-card-body -->
</div>